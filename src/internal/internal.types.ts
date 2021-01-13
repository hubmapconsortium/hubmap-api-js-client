interface InputTypes {
  cell: string[];
  organ: string[];
  gene: string[];
  cluster: string[];
}

interface CheckParametersTypes {
  inputType: string;
  outputType: keyof InputTypes;
  inputSet?: string[];
  genomicModality?: string;
  pValue?: number;
}
interface RequestObjectTypes {
  /* eslint-disable camelcase */
  input_type: string;
  input_set: string[];
  genomic_modality?: string;
  p_value?: number;
  logical_operator: 'and';
  /* eslint-enable camelcase */
}

export { InputTypes, CheckParametersTypes, RequestObjectTypes };
