export default class {
  private _path: string;

  get path(): string {
    return this._path;
  }

  register({ path }): void {
    this._path = path;
  }
}
