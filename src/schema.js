exports.data = {
  'type': 'object',
  'properties': {
    'principal': {
      'type': 'integer'
    },
    'upfrontFee': {
      'type': 'object',
      'properties': {
        'value': {
          'type': 'integer'
        }
      },
      'required': [
        'value'
      ]
    },
    'upfrontCreditlineFee': {
      'type': 'object',
      'properties': {
        'value': {
          'type': 'integer'
        }
      },
      'required': [
        'value'
      ]
    },
    'schedule': {
      'type': 'array',
      'items': [
        {
          'type': 'object',
          'properties': {
            'id': {
              'type': 'integer'
            },
            'date': {
              'type': 'string'
            },
            'principal': {
              'type': 'integer'
            },
            'interestFee': {
              'type': 'integer'
            }
          },
          'required': [
            'id',
            'date',
            'principal',
            'interestFee'
          ]
        }
      ]
    }
  },
  'required': [
    'principal',
    'upfrontFee',
    'upfrontCreditlineFee',
    'schedule'
  ]
}
