import { config } from '../config';
import { AppwriteAttribute, AppwriteSchema } from '../models';
import { logger, str } from '../utils';

const _types: { [key: string]: string } = {
  string: 'String',
  integer: 'int',
  boolean: 'bool',
  double: 'double',
  datetime: 'DateTime',
};

const _sortByRequired = (a: AppwriteAttribute, b: AppwriteAttribute) => {
  if (a.required) {
    return -1;
  }

  if (b.required) {
    return 1;
  }

  return 0;
};

const _sortByKey = (a: AppwriteAttribute, b: AppwriteAttribute) => {
  return a.key.localeCompare(b.key);
};

const DartAttribute = () => {};

export const Dart = (schema: AppwriteSchema): string => {
  const _className = str.upperFirstLetter(schema.name);
  let _attributes = schema.attributes;

  if (config.groupRequired) {
    _attributes = schema.attributes.sort(_sortByRequired);

    _attributes = [
      ..._attributes.filter((x) => x.required).sort(_sortByKey),
      ..._attributes.filter((x) => !x.required).sort(_sortByKey),
    ];
  }

  _attributes = _attributes.map((attribute) => {
    const lowered = str.lowerFirstLetter(attribute.key);
    const underscoreSplit = lowered.split('_');
    for (let i = 1; i < underscoreSplit.length; i++) {
      underscoreSplit[i] = str.upperFirstLetter(underscoreSplit[i]);
    }

    attribute.key = underscoreSplit.join('');

    return attribute;
  });

  const _properties = _attributes
    .filter((attribute) => {
      if (!_types.hasOwnProperty(attribute.type)) {
        logger.error(
          `Type "${attribute.type}" not found. Skipping "${attribute.key}"`
        );
        return false;
      }

      return true;
    })
    .map((attribute) => {
      const final = config.finalProperties ? 'final ' : '';
      const type = _types[attribute.type];
      const required = attribute.required ? '' : '?';

      return `\t${final}${type}${required} ${attribute.key};`;
    })
    .join('\n');

  const _constructor = [
    `\tconst ${_className} ({`,
    ..._attributes.map((attribute) => {
      const required = attribute.required ? 'required ' : '';

      return `\t\t${required}this.${attribute.key},`;
    }),
    '\t});',
  ].join('\n');

  const _copyWith = (
    config.includeCopyWith
      ? [
          `\t${_className} copyWith({`,
          ..._attributes.map((attribute) => {
            const type = _types[attribute.type];

            return `\t\t${type}? ${attribute.key},`;
          }),
          '\t}) {',
          `\t\treturn ${_className}(`,
          ..._attributes.map((attribute) => {
            return `\t\t\t${attribute.key}: ${attribute.key} ?? this.${attribute.key},`;
          }),
          '\t\t);',
          '\t}',
        ]
      : []
  ).join('\n');

  return [
    `class ${_className} {`,
    _properties,
    '',
    _constructor,
    '',
    _copyWith,
    '}',
  ].join('\n');
};
