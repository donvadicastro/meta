/**
 * Meta component renderer types
 */
export enum MetaComponentRenderer {
    /**
     * Default rendered as predefined type if no other specified in declaration
     */
    Default = 'default',

    /**
     * Simple editable primitive, including bool and number types
     */
    TextBox = 'textbox',

    /**
     * Simple readonly primitive, including bool and number types
     */
    Label = 'label',

    /**
     * Root form renderer
     */
    Form = 'form',
}
