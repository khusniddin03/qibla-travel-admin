export const formatPhoneNumber = (value: string = '') => {
  return value.replace(/[-|_)(\sg]/g, "");
}
