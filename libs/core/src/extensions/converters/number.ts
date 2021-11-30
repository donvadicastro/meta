/**
 * Meta component number data converter singleton class implementation. Used to convert incoming server data to correct type.
 */
export const convertNumber = (value: string) => {
    return parseInt(value);
}
