export const DartGenerator = {
  _types: {
    string: 'String',
    integer: 'int',
    boolean: 'bool',
    double: 'double',
    datetime: 'DateTime',
  },
  _attributeRename: function (name) {
    const lowered = name[0].toLocaleLowerCase() + name.substring(1);
    const split = lowered.split('_');

    for (let i = 1; i < split.length; i++) {
      split[i] =
        split[i][0].toLocaleUpperCase() +
        split[i].toLocaleLowerCase().substring(1);
    }

    return split.join('');
  },
  classRename: function (name) {
    const lowered = name[0].toLocaleUpperCase() + name.substring(1);
    const split = lowered.split('_');

    for (let i = 1; i < split.length; i++) {
      split[i] =
        split[i][0].toLocaleUpperCase() +
        split[i].toLocaleLowerCase().substring(1);
    }

    return split.join('');
  },
  attributes: function (attributes) {
    const parts = [];

    for (const attribute of attributes) {
      if (!this._types.hasOwnProperty(attribute.type)) {
        throw new Error(`Type "${attribute.type}" not found.`);
      }

      parts.push(
        `\t${this._types[attribute.type]}${
          attribute.required ? '' : '?'
        } ${this._attributeRename(attribute.key)};`
      );
    }

    return parts.join('\n');
  },
  constructor: function (metadata) {
    const parts = [];
    parts.push(`\t${this.classRename(metadata.name)}({`);

    for (const attribute of metadata.attributes) {
      if (!this._types.hasOwnProperty(attribute.type)) {
        throw new Error(`Type "${attribute.type}" not found.`);
      }

      parts.push(
        `\t\t${
          attribute.required ? 'required ' : ''
        }this.${this._attributeRename(attribute.key)},`
      );
    }

    parts.push('\t});');
    return parts.join('\n');
  },
  class: function (metadata, attributes, constructor) {
    const parts = [];
    parts.push(`class ${this.classRename(metadata.name)} {`);
    parts.push(attributes);
    parts.push('');
    parts.push(constructor);
    parts.push('}');
    return parts.join('\n');
  },
};
