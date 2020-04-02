import React, { Ref } from 'react';
import { connectField, filterDOMProps } from 'uniforms';
import wrapField from './wrapField';
import { TextInput, TextInputProps } from '@patternfly/react-core';

export type TextFieldProps = {
  // inputClassName?: string;
  // error?: boolean;
  id: any,
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value: string) => void;
  value?: string;
} & TextInputProps;

const Text = (props: TextFieldProps) => (
  wrapField(
    props,
    <TextInput
      id={props.id}
      name={name}
      css={CSS}
      isDisabled={props.isDisabled}
      onChange={(value) => props.onChange(value)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      type={props.type ?? 'text'}
      value={props.value ?? ''}
      { ...filterDOMProps(props) }
    />
  )
);

export default connectField(Text);
