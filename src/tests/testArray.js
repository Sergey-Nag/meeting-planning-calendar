export default function toBeArrayAndLengthToBeGreaterThan(received, max) {
  const pass = received.length > max;

  if (Array.isArray(received) && pass) {
    return {
      message: () => `expected array length is greater than ${max}`,
      pass: true,
    };
  }
  if (!Array.isArray(received)) {
    return {
      message: () => "received value is not array",
      pass: false,
    };
  }

  return {
    message: () => `expected array length is less than ${max}`,
    pass: false,
  };
}
