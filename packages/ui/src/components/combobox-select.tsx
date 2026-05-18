import { useMemo } from 'react';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus,
  ComboboxValue,
  useComboboxAnchor,
} from './combobox';

import type { Ref } from 'react';

interface Props {
  value?: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  options: { value: string; label: string }[];
  multiple?: boolean;

  ref?: Ref<HTMLInputElement>;
  onBlur?: () => void;
  disabled?: boolean;

  labelRenderer?: (option: {
    value: string;
    label?: string;
  }) => React.ReactNode;
  id?: string;

  externalSearching?: boolean;
  isSearching?: boolean;
  onInputValueChange?: (search: string) => void;
  searchingMessage?: string;
}

function ComboBoxSelect({
  value,
  onValueChange,
  placeholder = 'Select',
  emptyMessage = 'No options found',
  searchingMessage = 'Searching...',
  options,
  multiple = true,
  disabled,
  onBlur,
  ref,
  labelRenderer,
  id,
  externalSearching,
  isSearching,
  onInputValueChange,
}: Props) {
  const anchor = useComboboxAnchor();

  const optionsMap = useMemo(() => {
    return options.reduce(
      (acc, option) => {
        acc[option.value] = option;
        return acc;
      },
      {} as Record<string, { value: string; label: string }>
    );
  }, [options]);

  const normalizedValue = useMemo(() => {
    if (!multiple) return value?.[0] ?? null;
    return value ?? [];
  }, [value, multiple]);

  const handleValueChange = (values: string | string[] | null) => {
    if (Array.isArray(values)) {
      onValueChange(values);
    } else if (values === null) {
      onValueChange([]);
    } else {
      onValueChange([values]);
    }
  };

  const renderLabel = (item: string) => {
    const option = optionsMap[item];
    if (!option) return item;
    return labelRenderer ? labelRenderer(option) : option.label;
  };

  return (
    <Combobox
      id={id}
      items={options}
      disabled={disabled}
      multiple={multiple}
      autoHighlight
      value={normalizedValue}
      itemToStringLabel={item => optionsMap[item]?.label ?? item}
      onValueChange={handleValueChange}
      onInputValueChange={onInputValueChange}
      // filter={null} disables internal filtering entirely — Base UI's
      // recommended approach for async/externally-controlled search
      filter={externalSearching ? null : undefined}
    >
      {multiple ? (
        <ComboboxChips ref={anchor} onBlur={onBlur}>
          <ComboboxValue>
            {(value ?? []).map(item => (
              <ComboboxChip key={item}>{renderLabel(item)}</ComboboxChip>
            ))}
          </ComboboxValue>
          <ComboboxChipsInput
            ref={ref}
            placeholder={!value?.length ? placeholder : undefined}
          />
        </ComboboxChips>
      ) : (
        <ComboboxInput ref={ref} onBlur={onBlur} placeholder={placeholder} />
      )}
      <ComboboxContent anchor={anchor}>
        {/* ComboboxStatus is the Base UI way to show loading/status messages
            alongside results — it renders even when the list has items,
            unlike ComboboxEmpty which only shows when the list is empty */}
        {isSearching && <ComboboxStatus>{searchingMessage}</ComboboxStatus>}
        {!isSearching && <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>}
        <ComboboxList>
          {(item: { value: string; label: string }) => (
            <ComboboxItem key={item.value} value={item.value}>
              {labelRenderer ? labelRenderer(item) : item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export default ComboBoxSelect;
