import { type Ref, useCallback, useEffect, useMemo, useState } from 'react';

import { CheckIcon, ChevronsUpDownIcon, XCircle } from 'lucide-react';

import { Badge } from './badge';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface Props {
  value?: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  options: { value: string; label: string }[];
  multiple?: boolean;
  searchPlaceholder?: string;
  searchingMessage?: string;

  ref?: Ref<HTMLButtonElement>;
  onBlur?: () => void;
  disabled?: boolean;

  externalSearching?: boolean;
  isSearching?: boolean;
  onSearchChange?: (search: string) => void;

  labelRenderer?: (option: {
    value: string;
    label?: string;
  }) => React.ReactNode;

  filterSelected?: boolean;
  showNull?: boolean;
  setStableValue?: boolean;
}

function SimpleMultiSelect({
  value,
  onValueChange,
  placeholder = 'Select',
  emptyMessage = 'No options found',
  searchPlaceholder = 'Search',
  searchingMessage = 'Searching...',
  options,
  multiple = true,
  showNull = false,

  disabled,
  onBlur,
  ref,

  externalSearching,
  isSearching,
  onSearchChange,

  labelRenderer,

  setStableValue = true,
  // filterSelected = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const filteredValue = useMemo(() => {
    if (!multiple) return value?.[0] ? [value[0]] : undefined;
    return value;
  }, [value, multiple]);

  useEffect(() => {
    if (open) onSearchChange?.('');
  }, [onSearchChange, open]);

  const toggleSelection = useCallback(
    (v: string | null) => {
      if (v === null) {
        onValueChange([]);
        setOpen(false);
        return;
      }
      if (!multiple) {
        onValueChange([v]);
        setOpen(false);
        return;
      }

      const isIncluded = !!filteredValue?.includes(v);
      if (isIncluded)
        onValueChange(filteredValue?.filter(vv => vv !== v) || []);
      else onValueChange([...(filteredValue || []), v]);
    },
    [filteredValue, onValueChange, multiple]
  );

  const removeSelection = useCallback(
    (v: string) => {
      onValueChange(filteredValue?.filter(vv => vv !== v) || []);
    },
    [onValueChange, filteredValue]
  );

  const nothingSelected = Array.isArray(value) ? value.length === 0 : !value;

  const maxShownItems = 3;
  const visibleItems = expanded
    ? filteredValue
    : filteredValue?.slice(0, maxShownItems);
  const hiddenCount = (value?.length || 0) - (visibleItems?.length || 0);

  const optionsMap = useMemo(() => {
    const map = new Map<string, (typeof options)[0]>();
    options.forEach(option => map.set(option.value, option));
    return map;
  }, [options]);

  const firstSelected = optionsMap.get(filteredValue?.[0] || '');

  const filteredOptions = useMemo(() => {
    // if (!filterSelected || !filteredValue || !filteredValue.length)
    //   return options;

    return options;
    // return options.filter(option =>
    //   filteredValue?.some(fv => fv !== option.value),
    // );
    // }, [filterSelected, filteredValue, options]);
  }, [options]);

  return (
    <div className='w-full space-y-2'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              ref={ref}
              onBlur={onBlur}
              disabled={disabled}
              variant='outline'
              role='combobox'
              aria-multiselectable={multiple}
              aria-expanded={open}
              className='h-auto min-h-8 w-full justify-between hover:bg-transparent'
            >
              {multiple ? (
                <div className='flex flex-wrap items-center gap-1 pr-2.5'>
                  {!!filteredValue && filteredValue.length > 0 ? (
                    <>
                      {visibleItems?.map(val => {
                        const option = optionsMap.get(val);

                        return option ? (
                          <Badge variant='card' key={val}>
                            {labelRenderer
                              ? labelRenderer(option)
                              : option.label}
                            <Button
                              variant='ghost'
                              size='icon'
                              className='size-4 cursor-pointer hover:scale-110 hover:bg-transparent'
                              onClick={e => {
                                e.stopPropagation();
                                removeSelection(val);
                              }}
                              render={
                                <span>
                                  <XCircle className='size-3' />
                                </span>
                              }
                              nativeButton={false}
                            />
                          </Badge>
                        ) : null;
                      })}
                      {hiddenCount > 0 || expanded ? (
                        <Badge
                          variant='outline'
                          onClick={e => {
                            e.stopPropagation();
                            setExpanded(prev => !prev);
                          }}
                        >
                          {expanded ? 'Show Less' : `+${hiddenCount} more`}
                        </Badge>
                      ) : null}
                    </>
                  ) : (
                    <span className='text-muted-foreground'>{placeholder}</span>
                  )}
                </div>
              ) : (
                <span>
                  {firstSelected
                    ? labelRenderer
                      ? labelRenderer(firstSelected)
                      : firstSelected?.label
                    : placeholder}
                </span>
              )}
              <ChevronsUpDownIcon
                size={16}
                className='shrink-0 text-muted-foreground/80'
                aria-hidden='true'
              />
            </Button>
          }
        ></PopoverTrigger>
        <PopoverContent className='w-(--radix-popper-anchor-width) p-0'>
          <Command loop shouldFilter={!externalSearching}>
            <CommandInput
              placeholder={searchPlaceholder}
              onValueChange={onSearchChange}
            />
            <CommandList
              className='dark:scheme-dark'
              onWheel={e => e.stopPropagation()}
            >
              {isSearching && (
                <CommandLoading>{searchingMessage}</CommandLoading>
              )}
              {!isSearching && <CommandEmpty>{emptyMessage}</CommandEmpty>}
              <CommandGroup>
                {showNull && (
                  <CommandItem
                    value={undefined}
                    onSelect={() => toggleSelection(null)}
                    aria-selected={nothingSelected}
                  >
                    <span className='truncate'>None</span>
                    {nothingSelected && (
                      <CheckIcon size={16} className='ml-auto' />
                    )}
                  </CommandItem>
                )}
                {filteredOptions.map(option => (
                  <CommandItem
                    key={option.value}
                    value={setStableValue ? option.value : undefined}
                    onSelect={() => toggleSelection(option.value)}
                    aria-selected={!!value?.includes(option.value)}
                  >
                    <span className='truncate'>
                      {labelRenderer ? labelRenderer(option) : option.label}
                    </span>
                    {value?.includes(option.value) && (
                      <CheckIcon size={16} className='ml-auto' />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SimpleMultiSelect;
