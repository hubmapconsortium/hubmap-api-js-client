import Client from '../internal';
import { CheckParametersTypes } from '../internal/internal.types';

it('should return an object with input type, input set, and logical operator when only the required arguments are provided', () => {
  const inputType: string = 'cell';
  const outputType: string = 'organ';
  const inputSet: string[] = ['fake'];

  const testObj: CheckParametersTypes = {
    inputType,
    outputType,
    inputSet,
  };
  expect(Client.fillRequestObject(testObj)).toEqual({
    input_type: inputType,
    input_set: inputSet,
    logical_operator: 'and',
  });
});

it('should return an object with a p value when input type is organ or gene and output type is gene', () => {
  const inputType: string = 'organ';
  const outputType: string = 'gene';
  const inputSet: string[] = ['fake'];
  const pValue: number = 0.4;

  const testObj: CheckParametersTypes = {
    inputType,
    outputType,
    pValue,
    inputSet,
  };
  expect(Client.fillRequestObject(testObj)).toEqual({
    input_type: inputType,
    input_set: inputSet,
    p_value: pValue,
    logical_operator: 'and',
  });
});

it('should return an object with a genomic modality if it is defined', () => {
  const inputType: string = 'organ';
  const outputType: string = 'cell';
  const inputSet: string[] = ['fake'];
  const genomicModality: string = 'fake';

  const testObj: CheckParametersTypes = {
    inputType,
    outputType,
    genomicModality,
    inputSet,
  };
  expect(Client.fillRequestObject(testObj)).toEqual({
    input_type: inputType,
    input_set: inputSet,
    genomic_modality: genomicModality,
    logical_operator: 'and',
  });
});
