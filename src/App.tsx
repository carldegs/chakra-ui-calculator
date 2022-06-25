import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
  Stat,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  useClipboard,
  useToast,
  Collapse,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import ThemeParamSelector from './components/ThemeParamSelector';
import { THEME_PARAMS } from './constants';
import useConvert from './hooks/useConvert';
import { ThemeParam, ValueUnits } from './types';
import { parseValueString } from './utils/convert';

function App() {
  const [param, setParam] = useState(ThemeParam.fontSizes);
  const editorDisc = useDisclosure();

  const [value, setValue] = useState('');
  const [unit, setUnit] = useState(THEME_PARAMS[param].units[0]);
  const [copyVal, setCopyVal] = useState('');
  const { hasCopied, onCopy } = useClipboard(copyVal);
  const toast = useToast();
  const { themeValue } = useConvert(param, value, unit);

  useEffect(() => {
    if (copyVal) {
      onCopy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyVal]);

  useEffect(() => {
    if (hasCopied) {
      toast({
        status: 'success',
        position: 'bottom',
        description: 'Copied!',
        duration: 1000,
      });
    }
  }, [hasCopied, toast]);

  return (
    <>
      <Center h="full" w="full" flexDir={{ base: 'column', md: 'row' }}>
        <Flex
          flexGrow={1}
          maxW="md"
          bg={{ base: 'transparent', md: 'gray.700' }}
          borderRadius={{ base: 0, md: 'lg' }}
          alignItems="center"
          flexDir={{ base: 'column', md: 'row' }}
        >
          <Container maxW="container.lg">
            <Box py={4} px={2}>
              <HStack spacing={2} mb={8}>
                <ThemeParamSelector
                  onSelect={(param) => {
                    setParam(param);
                    if (!THEME_PARAMS[param].units.includes(unit)) {
                      setUnit(THEME_PARAMS[param].units[0]);
                    }
                  }}
                  active={param}
                />
                <Heading fontSize="2xl" fontWeight={400}>
                  {THEME_PARAMS[param]?.name}
                </Heading>
              </HStack>
              <Stack spacing={8}>
                <Flex alignItems="flex-end">
                  <FormControl pr={4}>
                    <Input
                      variant="flushed"
                      size="lg"
                      onChange={(e) => {
                        const newData = parseValueString(e.target.value);
                        setValue(`${newData?.value}` || '');
                        if (
                          newData?.unit &&
                          THEME_PARAMS[param].units.includes(newData.unit)
                        ) {
                          setUnit(newData.unit);
                        }
                      }}
                      value={value}
                      placeholder="Add value here"
                    />
                    <FormHelperText>
                      You can paste units (px, etc.,)
                    </FormHelperText>
                  </FormControl>
                  <FormControl w="85px">
                    <Select
                      variant="flushed"
                      size="lg"
                      onChange={(e) => {
                        setUnit(e.target.value as ValueUnits);
                      }}
                      value={unit}
                    >
                      {THEME_PARAMS[param]?.units.map((unit) => (
                        <option value={unit} key={`option-${unit}`}>
                          {unit}
                        </option>
                      ))}
                    </Select>
                    <FormHelperText color="transparent">boo.</FormHelperText>
                  </FormControl>
                </Flex>

                <FormControl>
                  <FormLabel>Closest Theme Value</FormLabel>
                  <SimpleGrid columns={2} spacing={3} minH="81px">
                    {themeValue.map((tv) => (
                      <Flex
                        bg={
                          tv.difference === 0
                            ? 'green.500'
                            : tv.difference > 0
                            ? 'orange.500'
                            : 'red.500'
                        }
                        px={6}
                        py={2}
                        borderRadius="xl"
                        cursor="pointer"
                        key={`${tv.value}-${tv.actualValue}-stat`}
                        _hover={{
                          transform: 'scale(1.02)',
                        }}
                        onClick={() => {
                          setCopyVal(tv.value);
                        }}
                      >
                        <Stat role="group">
                          <StatNumber>{tv.value}</StatNumber>
                          <StatHelpText>
                            {`${tv.actualValue} ${
                              tv.difference === 0
                                ? ''
                                : tv.difference > 0
                                ? `(+${tv.difference.toFixed(2)}px)`
                                : `(${tv.difference.toFixed(2)}px)`
                            }`}
                          </StatHelpText>
                        </Stat>
                      </Flex>
                    ))}
                  </SimpleGrid>
                  <FormHelperText>Click to copy theme value</FormHelperText>
                </FormControl>
              </Stack>
            </Box>
          </Container>
          {/* <IconButton
            alignItems="center"
            color="gray.500"
            cursor="pointer"
            onClick={editorDisc.onToggle}
            title="Show Default Values"
            px={{ base: 'initial', md: 1 }}
            py={{ base: 1, md: 'initial' }}
            colorScheme="teal"
            aria-label="Show default values"
            variant="ghost"
            _hover={{ color: 'teal.300', bg: 'teal.800' }}
            icon={
              <>
                <Show above="md">
                  {editorDisc.isOpen ? (
                    <CaretLeft size={28} weight="duotone" />
                  ) : (
                    <CaretRight size={28} weight="duotone" />
                  )}
                </Show>

                <Show below="md">
                  {editorDisc.isOpen ? (
                    <CaretUp size={28} weight="duotone" />
                  ) : (
                    <CaretDown size={28} weight="duotone" />
                  )}
                </Show>
              </>
            }
          /> */}
        </Flex>
        <Collapse in={editorDisc.isOpen} animateOpacity>
          <Flex>
            <Heading>TEST</Heading>
            <Heading>TEST</Heading>
            <Heading>TEST</Heading>
            <Heading>TEST</Heading>
          </Flex>
        </Collapse>
      </Center>
    </>
  );
}

export default App;
