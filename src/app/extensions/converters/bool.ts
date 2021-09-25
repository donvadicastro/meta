//TODO: create interface to work with. Should implement required 'parse' method
/**
 * Meta component boolean data converter singleton class implementation. Used to convert incoming server data to correct type.
 */
const types: any = {'true': true, 'false': false, '0': false};

export const convertBool = (value: string) => {
    return value in types ? types[value] : !!value;
}
