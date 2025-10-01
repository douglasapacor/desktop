import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
type defaultResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};

export class NoDataError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "No data on Response";
  }
}

const instance = axios.create();

const get = async <T = any>(
  url: string,
  config?: AxiosRequestConfig<any>
): Promise<defaultResponse<T>> => {
  try {
    const requestHTTP: AxiosResponse<defaultResponse<T>> = await instance.get(
      url,
      config
    );

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

const post = async <T = any>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig<any>
): Promise<defaultResponse<T>> => {
  try {
    const requestHTTP: AxiosResponse<defaultResponse<T>> = await instance.post(
      url,
      body,
      config
    );

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

const put = async <T = any>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig<any>
): Promise<defaultResponse<T>> => {
  try {
    const requestHTTP: AxiosResponse<defaultResponse<T>> = await instance.put(
      url,
      body,
      config
    );

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

const del = async <T = any>(
  url: string,
  config?: AxiosRequestConfig<any>
): Promise<defaultResponse<T>> => {
  try {
    const requestHTTP: AxiosResponse<defaultResponse<T>> =
      await instance.delete(url, config);

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

export default {
  get,
  post,
  put,
  del,
};
