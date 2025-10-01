import { root } from "..";
import fs from "fs";
import settings from "../../settings.json";
import path from "path";
import crypto from "crypto";

export default abstract class<T extends object> {
  private filePath: string;
  private encryptionKey: any;
  private iv_length = 12;
  private auth_tag_length = 16;

  constructor(fileName: string) {
    const base = root.path;
    this.encryptionKey = Buffer.from(settings.key, "utf8");

    if (!fs.existsSync(base)) fs.mkdirSync(base, { recursive: true });

    this.filePath = path.join(base, fileName);
    this.ensureFileExists();
  }

  protected abstract defaultData(): T;

  public async load(): Promise<T> {
    if (!fs.existsSync(this.filePath)) {
      const def = this.defaultData();
      await this.save(def);
      return this.deepClone(def);
    }

    const raw = await fs.promises.readFile(this.filePath);

    try {
      const json = this.decrypt(raw);
      const parsed = JSON.parse(json) as T;

      return this.deepClone(parsed);
    } catch (err: any) {
      const corruptPath = this.filePath + `.corrupt.${Date.now()}`;

      console.warn(
        `[Leitor INR] Falha ao ler/decodificar ${this.filePath}: ${String(
          err
        )}. Movendo para ${corruptPath} e recriando com defaults.`
      );

      try {
        await fs.promises.rename(this.filePath, corruptPath);
      } catch (renameErr) {
        console.warn(
          "[Leitor INR] Falha ao renomear arquivo corrompido:",
          renameErr
        );
      }

      const def = this.defaultData();
      await this.save(def);
      return this.deepClone(def);
    }
  }

  private deepClone<U>(v: U): U {
    return JSON.parse(JSON.stringify(v));
  }

  public async save(data: T): Promise<void> {
    const json: any = JSON.stringify(data, null, 2);
    const encrypted: any = this.encrypt(Buffer.from(json, "utf8"));

    const tmpPath = this.filePath + ".tmp";
    await fs.promises.writeFile(tmpPath, encrypted);
    await fs.promises.rename(tmpPath, this.filePath);
  }

  public async delete(): Promise<void> {
    if (fs.existsSync(this.filePath)) {
      await fs.promises.unlink(this.filePath);
    }
  }

  public has(): boolean {
    return fs.existsSync(this.filePath);
  }

  private decrypt(payload: Buffer): string {
    if (payload.length < this.iv_length + this.auth_tag_length)
      throw new Error("Payload muito pequeno para conter IV + TAG");

    const iv: any = payload.slice(0, this.iv_length);
    const tag: any = payload.slice(payload.length - this.auth_tag_length);
    const ciphertext: any = payload.slice(
      this.iv_length,
      payload.length - this.auth_tag_length
    );

    const decipher: any = crypto.createDecipheriv(
      "aes-256-gcm",
      this.encryptionKey,
      iv,
      { authTagLength: this.auth_tag_length }
    );

    decipher.setAuthTag(tag);

    const decrypted: any = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  }

  private encrypt(plain: any): Buffer {
    const iv: any = crypto.randomBytes(this.iv_length);
    const cipher: any = crypto.createCipheriv(
      "aes-256-gcm",
      this.encryptionKey,
      iv,
      { authTagLength: this.auth_tag_length }
    );
    const enc = Buffer.concat([cipher.update(plain), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, enc, tag]);
  }

  private ensureFileExists() {
    if (!fs.existsSync(this.filePath)) {
      const dir = path.dirname(this.filePath);

      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const def = this.defaultData();
      const json = JSON.stringify(def, null, 2);
      const encrypted: any = this.encrypt(Buffer.from(json, "utf8"));

      fs.writeFileSync(this.filePath, encrypted);
    }
  }
}
