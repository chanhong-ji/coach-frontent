import "dotenv/config";

function required(key: string, defaultValue: any = undefined) {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`envError : Key ${key} is undefind`);
  }
  return value;
}

export default {
  host: {
    port: parseInt(required("HOST_PORT", 5000)),
  },
  server: {
    endPoint: required("SERVER_END_POINT"),
  },
};
