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

export const Dart = (schema: AppwriteSchema): string => {
  const _className = str.upperFirstLetter(schema.name);
  const _attributes = schema.attributes.map((attribute) => {
    const lowered = str.lowerFirstLetter(attribute.key);
    const underscoreSplit = lowered.split('_');
    for (let i = 1; i < underscoreSplit.length; i++) {
      underscoreSplit[i] = str.upperFirstLetter(underscoreSplit[i]);
    }

    attribute.key = underscoreSplit.join('');

    return attribute;
  });

  const _properties = (
    config.groupRequired ? _attributes.sort(_sortByRequired) : _attributes
  )
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
      const type = _types[attribute.type];
      const required = attribute.required ? '' : '?';

      return `\t${type}${required} ${attribute.key};`;
    })
    .join('\n');

  const _constructor = [
    `\tconst ${_className} ({`,
    ...(config.groupRequired
      ? _attributes.sort(_sortByRequired)
      : _attributes
    ).map((attribute) => {
      return '\t\t,';
    }),
    '\t});',
  ].join('\n');

  return _constructor;
};
