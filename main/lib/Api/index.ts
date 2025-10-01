import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_PATH_API } from "../../static";
export type defaultResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};

export default class Api {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({ baseURL: BASE_PATH_API });
  }

  protected get = async <T = any>(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<defaultResponse<T>> => {
    try {
      const requestHTTP: AxiosResponse<defaultResponse<T>> =
        await this.instance.get(url, config);

      if (requestHTTP.status === 200) {
        if (requestHTTP.data.data) {
          return {
            success: requestHTTP.data.success,
            data: requestHTTP.data.data,
            message: requestHTTP.data.message,
          };
        } else {
          return {
            success: requestHTTP.data.success,
            message: requestHTTP.data.message,
          };
        }
      } else {
        return {
          success: false,
          message: requestHTTP.data.message,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  protected post = async <T = any>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<defaultResponse<T>> => {
    try {
      const requestHTTP: AxiosResponse<defaultResponse<T>> =
        await this.instance.post(url, body, config);

      if (requestHTTP.status === 200) {
        if (requestHTTP.data.data) {
          return {
            success: requestHTTP.data.success,
            data: requestHTTP.data.data,
            message: requestHTTP.data.message,
          };
        } else {
          return {
            success: requestHTTP.data.success,
            message: requestHTTP.data.message,
          };
        }
      } else {
        return {
          success: false,
          message: requestHTTP.data.message,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  protected put = async <T = any>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<defaultResponse<T>> => {
    try {
      const requestHTTP: AxiosResponse<defaultResponse<T>> =
        await this.instance.put(url, body, config);

      if (requestHTTP.status === 200) {
        if (requestHTTP.data.data) {
          return {
            success: requestHTTP.data.success,
            data: requestHTTP.data.data,
            message: requestHTTP.data.message,
          };
        } else {
          return {
            success: requestHTTP.data.success,
            message: requestHTTP.data.message,
          };
        }
      } else {
        return {
          success: false,
          message: requestHTTP.data.message,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  };

  protected del = async <T = any>(
    url: string,
    config?: AxiosRequestConfig<any>
  ): Promise<defaultResponse<T>> => {
    try {
      const requestHTTP: AxiosResponse<defaultResponse<T>> =
        await this.instance.delete(url, config);

      if (requestHTTP.status === 200) {
        if (requestHTTP.data.data) {
          return {
            success: requestHTTP.data.success,
            data: requestHTTP.data.data,
            message: requestHTTP.data.message,
          };
        } else {
          return {
            success: requestHTTP.data.success,
            message: requestHTTP.data.message,
          };
        }
      } else {
        return {
          success: false,
          message: requestHTTP.data.message,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  };
}
