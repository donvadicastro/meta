/**
 * Meta component date data converter singleton class implementation. Used to convert incoming server data to correct type.
 */
export const convertDate = (value: string) => {
    return new Date(value);
}
