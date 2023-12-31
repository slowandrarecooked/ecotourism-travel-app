import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Box,
  Flex,
  Text,
  Button,
  Spacer,
  HStack,
  IconButton,
  Image,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  VStack,
  FormLabel,
  Input,
  Select,
  Modal,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

import {
  BsFill1SquareFill,
  BsFill3SquareFill,
  BsFill4SquareFill,
  BsFillInfoCircleFill,
  BsFill2SquareFill,
} from "react-icons/bs";
import { GrFormSubtract, GrFormAdd, GrRadialSelected } from "react-icons/gr";
import Price from "../Price";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer1";

// const data = {
//   id: 1,
//   image_url: "https://source.unsplash.com/random/300Xx1200/?Travel",
//   destination_title: "Narkanda",
//   location: "Sri Lanka",
//   grade: "4 stars",
//   fees: "1113",
//   description:
//     "Narkanda is a tiny town in Shimla in the Indian hill state of Himachal Pradesh. Seated on the Hindustan-Tibet Road, Narkanda is encircled by the green cover of the Himalayas and hence, renowned for its apple orchards, treks and scenic beauty.",
// };

function Payment() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [inc, setInc] = useState(1);
  const [traveler, settraveler] = useState({
    title: "",
    first_Name: "",
    last_Name: "",
    email: "",
    phone: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    nationality: "",
    c_holder: "",
    c_number: "",
    exp_day: "",
    cvv: "",
  });

  const [pin, setpin] = useState({
    first: "",
    sec: "",
    third: "",
    fourth: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [check, setcheck] = useState(false);
  const toast = useToast();
  const getDataFromApi = async () => {
    try {
      await axios
        .get(`https://long-puce-octopus-wrap.cyclic.cloud/destinations/${id}`, {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        })
        .then((res) => {
          console.log(res);
          setData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  getDataFromApi();
  const handleInputChange = (e) => {
    settraveler({ ...traveler, [e.target.name]: e.target.value });
  };

  const getData = () => {
    console.log(traveler);

    if (
      !traveler.first_Name ||
      !traveler.last_Name ||
      !traveler.title ||
      !traveler.email ||
      !traveler.phone ||
      !traveler.day ||
      !traveler.month ||
      !traveler.year ||
      !traveler.gender ||
      !traveler.nationality ||
      !traveler.c_holder ||
      !traveler.c_number ||
      !traveler.exp_day ||
      !traveler.cvv
    ) {
      toast({
        title: "Please fill all details",
        status: "warning",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } else {
      onOpen();
      toast({
        description: "Your OTP is 4567",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Navbar />

      <Box minH={"100vh"} bg={"gray.100"} color={"blackAlpha.800"}>
        <Box w={{ base: "92%", md: "95%", lg: "76%" }} m={"auto"}>
          <Flex py={"30px"}>
            <Text
              fontSize={{ base: "20px", md: "33px", lg: "33px" }}
              fontWeight={"600"}
            >
              {data.destination}, {data.location}
            </Text>
            <Spacer />
            <Button
              colorScheme="none"
              bg={"white"}
              color={"blackAlpha.800"}
              mr={"10px"}
              borderRadius={"20px"}
              display={{ base: "none", md: "block", lg: "block" }}
            >
              Need Help?
            </Button>
            <Button
              colorScheme="none"
              bg={"white"}
              color={"blackAlpha.800"}
              borderRadius={"20px"}
              display={{ base: "none", md: "block", lg: "block" }}
            >
              Share Your Journey
            </Button>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Box w={{ base: "100%", md: "100%", lg: "67%" }}>
              <Box
                my={"25px"}
                p={"20px"}
                borderRadius={"15px"}
                bg={"white"}
                boxShadow={"md"}
              >
                <HStack>
                  <BsFill1SquareFill size={"30px"} />
                  <Text
                    pb={"5px"}
                    fontWeight={"700"}
                    fontSize={"20px"}
                    px={"10px"}
                  >
                    How Many Travelers Are Exploring?
                  </Text>
                </HStack>
                <HStack mt={"30px"}>
                  <Text fontWeight={"700"}>{inc} x traveller </Text>
                  <Spacer />
                  <HStack>
                    <IconButton
                      onClick={() => {
                        setInc(inc - 1);
                      }}
                      isDisabled={inc === 1}
                      icon={<GrFormSubtract size={"25px"} />}
                      rounded={"full"}
                      boxShadow={"lg"}
                    />
                    <Text px={"10px"}>{inc}</Text>
                    <IconButton
                      onClick={() => {
                        setInc(inc + 1);
                      }}
                      icon={<GrFormAdd size={"25px"} />}
                      rounded={"full"}
                      boxShadow={"lg"}
                    />
                  </HStack>
                </HStack>
              </Box>
              {/* ===============================================================> */}
              <Box
                p={"20px"}
                bg={"white"}
                boxShadow={"md"}
                borderRadius={"15px"}
              >
                <HStack>
                  <BsFill2SquareFill size={"30px"} />
                  <Text px={"10px"} fontWeight={"700"} fontSize={"20px"}>
                    Add traveller details
                  </Text>
                </HStack>
                <HStack
                  ml={"8px"}
                  borderRadius={"15px"}
                  p={"20px"}
                  bg={"gray.200"}
                  my={"25px"}
                >
                  <BsFillInfoCircleFill size={"25px"} />
                  <HStack
                    px={"10px"}
                    fontWeight={{ base: "500", md: "700", lg: "700" }}
                    fontSize={{ base: "14px", md: "16", lg: "16" }}
                  >
                    <Text>Please Note:</Text>
                    <Text textAlign="left">
                      Ensure your traveler details align with your passport
                      information.
                    </Text>
                  </HStack>
                </HStack>
                <RadioGroup
                  py={"35px"}
                  name="title"
                  value={traveler.title}
                  onChange={(value) =>
                    handleInputChange({ target: { name: "title", value } })
                  }
                  isRequired
                >
                  <HStack>
                    <Text fontWeight={"700"} fontSize={"14px"} px={"10px"}>
                      Title*
                    </Text>
                    <Radio value="Mr.">Mr.</Radio>
                    <Radio value="Ms.">Ms.</Radio>
                    <Radio value="Mrs.">Mrs.</Radio>
                    <Radio value="Miss">Miss</Radio>
                  </HStack>
                </RadioGroup>

                <FormControl ml={"13px"}>
                  <VStack align={"left"}>
                    <FormLabel
                      mb={"-19px"}
                      ml={"15px"}
                      fontSize={"14px"}
                      fontWeight={"700"}
                      bg={"white"}
                      zIndex="4"
                      w="90px"
                      pl="6px"
                    >
                      First Name*
                    </FormLabel>
                    <Input
                      name="first_Name"
                      onChange={handleInputChange}
                      autoComplete="on"
                      w={{ base: "80%", md: "45%", lg: "45%" }}
                      size={"lg"}
                      border={"1px solid silver"}
                      type="text"
                    />
                  </VStack>

                  <VStack align={"left"} my={"20px"}>
                    <FormLabel
                      mb={"-19px"}
                      ml={"15px"}
                      fontSize={"14px"}
                      fontWeight={"700"}
                      bg={"white"}
                      zIndex="4"
                      w="90px"
                      pl="6px"
                    >
                      Last Name*
                    </FormLabel>
                    <Input
                      name="last_Name"
                      onChange={handleInputChange}
                      autoComplete="on"
                      w={{ base: "80%", md: "45%", lg: "45%" }}
                      size={"lg"}
                      border={"1px solid silver"}
                      type="text"
                    />
                  </VStack>

                  <VStack align={"left"}>
                    <FormLabel
                      mb={"-19px"}
                      ml={"15px"}
                      fontSize={"14px"}
                      fontWeight={"700"}
                      bg={"white"}
                      zIndex="4"
                      w="55px"
                      pl="6px"
                    >
                      Email*
                    </FormLabel>
                    <Input
                      name="email"
                      onChange={handleInputChange}
                      autoComplete="on"
                      w={{ base: "80%", md: "45%", lg: "45%" }}
                      size={"lg"}
                      border={"1px solid silver"}
                      type="email"
                    />
                  </VStack>

                  <VStack align={"left"} my={"20px"}>
                    <FormLabel
                      mb={"-19px"}
                      ml={"15px"}
                      fontSize={"14px"}
                      fontWeight={"700"}
                      bg={"white"}
                      zIndex="4"
                      w="115px"
                      pl="6px"
                    >
                      Phone Number*
                    </FormLabel>
                    <Input
                      name="phone"
                      onChange={handleInputChange}
                      autoComplete="on"
                      w={{ base: "80%", md: "45%", lg: "45%" }}
                      size={"lg"}
                      border={"1px solid silver"}
                      type="tel"
                      placeholder="e.g. +91 9778556788"
                    />
                  </VStack>

                  <Text
                    fontWeight={"700"}
                    mb={"15px"}
                    fontSize={"16px"}
                    align={"left"}
                  >
                    Date of Birth*
                  </Text>
                  <HStack>
                    <Box position={"relative"}>
                      <FormLabel
                        pos="absolute"
                        top="-10px"
                        ml="14px"
                        fontSize="14px"
                        fontWeight="700"
                        bg="white"
                        zIndex="4"
                        w="35px"
                        pl="6px"
                      >
                        Day
                      </FormLabel>
                      <Select
                        size={"lg"}
                        w={"80px"}
                        border={"1px solid silver"}
                        name="day"
                        onChange={handleInputChange}
                      >
                        <option value="" style={{ backgroundColor: "white" }}>
                          {" "}
                        </option>
                        <option value="01" style={{ backgroundColor: "white" }}>
                          01
                        </option>
                        <option value="02" style={{ backgroundColor: "white" }}>
                          02
                        </option>
                        <option value="03" style={{ backgroundColor: "white" }}>
                          03
                        </option>
                        <option value="04" style={{ backgroundColor: "white" }}>
                          04
                        </option>
                        <option value="05" style={{ backgroundColor: "white" }}>
                          05
                        </option>
                        <option value="06" style={{ backgroundColor: "white" }}>
                          06
                        </option>
                        <option value="07" style={{ backgroundColor: "white" }}>
                          07
                        </option>
                        <option value="08" style={{ backgroundColor: "white" }}>
                          08
                        </option>
                        <option value="09" style={{ backgroundColor: "white" }}>
                          09
                        </option>
                        <option value="10" style={{ backgroundColor: "white" }}>
                          10
                        </option>
                        <option value="11" style={{ backgroundColor: "white" }}>
                          11
                        </option>
                        <option value="12" style={{ backgroundColor: "white" }}>
                          12
                        </option>
                        <option value="13" style={{ backgroundColor: "white" }}>
                          13
                        </option>
                        <option value="14" style={{ backgroundColor: "white" }}>
                          14
                        </option>
                        <option value="15" style={{ backgroundColor: "white" }}>
                          15
                        </option>
                        <option value="16" style={{ backgroundColor: "white" }}>
                          16
                        </option>
                        <option value="17" style={{ backgroundColor: "white" }}>
                          17
                        </option>
                        <option value="18" style={{ backgroundColor: "white" }}>
                          18
                        </option>
                        <option value="19" style={{ backgroundColor: "white" }}>
                          19
                        </option>
                        <option value="20" style={{ backgroundColor: "white" }}>
                          20
                        </option>
                        <option value="21" style={{ backgroundColor: "white" }}>
                          21
                        </option>
                        <option value="22" style={{ backgroundColor: "white" }}>
                          22
                        </option>
                        <option value="23" style={{ backgroundColor: "white" }}>
                          23
                        </option>
                        <option value="24" style={{ backgroundColor: "white" }}>
                          24
                        </option>
                        <option value="25" style={{ backgroundColor: "white" }}>
                          25
                        </option>
                        <option value="26" style={{ backgroundColor: "white" }}>
                          26
                        </option>
                        <option value="27" style={{ backgroundColor: "white" }}>
                          27
                        </option>
                        <option value="28" style={{ backgroundColor: "white" }}>
                          28
                        </option>
                        <option value="29" style={{ backgroundColor: "white" }}>
                          29
                        </option>
                        <option value="30" style={{ backgroundColor: "white" }}>
                          30
                        </option>
                        <option value="31" style={{ backgroundColor: "white" }}>
                          31
                        </option>
                      </Select>
                    </Box>
                    <Box position={"relative"}>
                      <label
                        style={{
                          position: "absolute",
                          top: "-9px",
                          marginLeft: "-55px",
                          fontSize: "14px",
                          fontWeight: "700",
                          backgroundColor: "white",
                          zIndex: "4",
                          width: "58px",
                          paddingLeft: "6px",
                        }}
                      >
                        Month
                      </label>
                      <Select
                        name="month"
                        onChange={handleInputChange}
                        bg={"white"}
                        size={"lg"}
                        w={{ base: "100px", md: "145px", lg: "145px" }}
                        border={"1px solid silver"}
                      >
                        <option value="00" style={{ backgroundColor: "white" }}>
                          {" "}
                        </option>
                        <option value="01" style={{ backgroundColor: "white" }}>
                          January
                        </option>
                        <option value="02" style={{ backgroundColor: "white" }}>
                          February
                        </option>
                        <option value="03" style={{ backgroundColor: "white" }}>
                          March
                        </option>
                        <option value="04" style={{ backgroundColor: "white" }}>
                          April
                        </option>
                        <option value="05" style={{ backgroundColor: "white" }}>
                          May
                        </option>
                        <option value="06" style={{ backgroundColor: "white" }}>
                          June
                        </option>
                        <option value="07" style={{ backgroundColor: "white" }}>
                          July
                        </option>
                        <option value="08" style={{ backgroundColor: "white" }}>
                          August
                        </option>
                        <option value="09" style={{ backgroundColor: "white" }}>
                          September
                        </option>
                        <option value="10" style={{ backgroundColor: "white" }}>
                          October
                        </option>
                        <option value="11" style={{ backgroundColor: "white" }}>
                          November
                        </option>
                        <option value="12" style={{ backgroundColor: "white" }}>
                          December
                        </option>
                      </Select>
                    </Box>

                    <Box position={"relative"}>
                      <label
                        style={{
                          position: "absolute",
                          top: "-9px",
                          marginLeft: "-26px",
                          fontSize: "14px",
                          fontWeight: "700",
                          backgroundColor: "white",
                          zIndex: "4",
                          width: "40px",
                          paddingLeft: "6px",
                        }}
                      >
                        Year
                      </label>
                      <Select
                        size={"lg"}
                        w={"95px"}
                        border={"1px solid silver"}
                        name="year"
                        onChange={handleInputChange}
                      >
                        <option
                          value=""
                          style={{ backgroundColor: "white" }}
                        ></option>
                        <option
                          value="1988"
                          style={{ backgroundColor: "white" }}
                        >
                          1988
                        </option>
                        <option
                          value="1989"
                          style={{ backgroundColor: "white" }}
                        >
                          1989
                        </option>
                        <option
                          value="1990"
                          style={{ backgroundColor: "white" }}
                        >
                          1990
                        </option>
                        <option
                          value="1991"
                          style={{ backgroundColor: "white" }}
                        >
                          1991
                        </option>
                        <option
                          value="1992"
                          style={{ backgroundColor: "white" }}
                        >
                          1992
                        </option>
                        <option
                          value="1993"
                          style={{ backgroundColor: "white" }}
                        >
                          1993
                        </option>
                        <option
                          value="1994"
                          style={{ backgroundColor: "white" }}
                        >
                          1994
                        </option>
                        <option
                          value="1995"
                          style={{ backgroundColor: "white" }}
                        >
                          1995
                        </option>
                        <option
                          value="1996"
                          style={{ backgroundColor: "white" }}
                        >
                          1996
                        </option>
                        <option
                          value="1997"
                          style={{ backgroundColor: "white" }}
                        >
                          1997
                        </option>
                        <option
                          value="1998"
                          style={{ backgroundColor: "white" }}
                        >
                          1998
                        </option>
                        <option
                          value="1999"
                          style={{ backgroundColor: "white" }}
                        >
                          1999
                        </option>
                        <option
                          value="2000"
                          style={{ backgroundColor: "white" }}
                        >
                          2000
                        </option>
                        <option
                          value="2001"
                          style={{ backgroundColor: "white" }}
                        >
                          2001
                        </option>
                        <option
                          value="2002"
                          style={{ backgroundColor: "white" }}
                        >
                          2002
                        </option>
                        <option
                          value="2003"
                          style={{ backgroundColor: "white" }}
                        >
                          2003
                        </option>
                        <option
                          value="2004"
                          style={{ backgroundColor: "white" }}
                        >
                          2004
                        </option>
                        <option
                          value="2005"
                          style={{ backgroundColor: "white" }}
                        >
                          2005
                        </option>
                        <option
                          value="2006"
                          style={{ backgroundColor: "white" }}
                        >
                          2006
                        </option>
                        <option
                          value="2007"
                          style={{ backgroundColor: "white" }}
                        >
                          2007
                        </option>
                        <option
                          value="2008"
                          style={{ backgroundColor: "white" }}
                        >
                          2008
                        </option>
                        <option
                          value="2009"
                          style={{ backgroundColor: "white" }}
                        >
                          2009
                        </option>
                        <option
                          value="2010"
                          style={{ backgroundColor: "white" }}
                        >
                          2010
                        </option>
                      </Select>
                    </Box>
                  </HStack>

                  <RadioGroup py={"35px"} isRequired>
                    <HStack>
                      <Text fontWeight={"700"} fontSize={"15px"} px={"10px"}>
                        Gender*
                      </Text>
                      <Radio
                        name="gender"
                        value="male"
                        onChange={handleInputChange}
                      >
                        Male
                      </Radio>
                      <Radio
                        name="gender"
                        value="female"
                        onChange={handleInputChange}
                      >
                        Female
                      </Radio>
                    </HStack>
                  </RadioGroup>
                  <Box position={"relative"}>
                    <label
                      style={{
                        position: "absolute",
                        top: "-9px",
                        marginLeft: "-290px",
                        fontSize: "14px",
                        fontWeight: "700",
                        backgroundColor: "white",
                        zIndex: "4",
                        width: "90px",
                        paddingLeft: "6px",
                      }}
                    >
                      Nationality*
                    </label>
                    <Select
                      w={"45%"}
                      size={"lg"}
                      border={"1px solid silver"}
                      name="nationality"
                      onChange={handleInputChange}
                    >
                      <option
                        value=""
                        style={{ backgroundColor: "white" }}
                      ></option>
                      <option
                        value="India"
                        style={{ backgroundColor: "white" }}
                      >
                        India
                      </option>
                      <option
                        value="Russia"
                        style={{ backgroundColor: "white" }}
                      >
                        Russia
                      </option>
                      <option
                        value="Nepal"
                        style={{ backgroundColor: "white" }}
                      >
                        Nepal
                      </option>
                      <option
                        value="Sri_lanka"
                        style={{ backgroundColor: "white" }}
                      >
                        Sri lanka
                      </option>
                      <option
                        value="Bhutan"
                        style={{ backgroundColor: "white" }}
                      >
                        Bhutan
                      </option>
                      <option
                        value="France"
                        style={{ backgroundColor: "white" }}
                      >
                        France
                      </option>
                      <option value="USA" style={{ backgroundColor: "white" }}>
                        USA
                      </option>
                      <option
                        value="Germany"
                        style={{ backgroundColor: "white" }}
                      >
                        Germany
                      </option>
                    </Select>
                  </Box>
                </FormControl>
              </Box>
              {/* ===============================================================> */}

              <Box
                my={"25px"}
                p={"20px"}
                borderRadius={"15px"}
                bg={"white"}
                boxShadow={"md"}
              >
                <HStack>
                  <BsFill3SquareFill size={"30px"} />
                  <Text
                    pb={"5px"}
                    fontWeight={"700"}
                    fontSize={"20px"}
                    px={"10px"}
                  >
                    Savings
                  </Text>
                </HStack>
                <Text
                  mt={"30px"}
                  mb={"8px"}
                  color={"blue.500"}
                  cursor={"pointer"}
                >
                  Redeem Promo Code
                </Text>
              </Box>
              {/* ==========================================================================> */}
              <Box
                my={"25px"}
                p={"20px"}
                boxShadow={"md"}
                bg={"white"}
                borderRadius={"15px"}
              >
                <HStack>
                  <BsFill4SquareFill size={"30px"} />
                  <Text
                    pb={"5px"}
                    fontWeight={"700"}
                    fontSize={"20px"}
                    px={"10px"}
                  >
                    Add payment details
                  </Text>
                </HStack>

                <HStack
                  p={"15px"}
                  my={"20px"}
                  bg={"gray.200"}
                  borderRadius={"15px"}
                >
                  <BsFillInfoCircleFill size={"20px"} />
                  <Text
                    px={"10px"}
                    align={"left"}
                    fontSize={{ base: "14px", md: "16px", lg: "16px" }}
                    fontWeight={"400"}
                    color={"blackAlpha.800"}
                  >
                    This is a secure and SSL encrypted payment. Your credit card
                    details are safe.
                  </Text>
                </HStack>

                <Box>
                  <Text py={"10px"} fontSize={"16px"}>
                    Select your payment method:
                  </Text>
                  <Box
                    boxShadow={"md"}
                    border={"1px solid silver"}
                    bg={"white"}
                    borderRadius={"15px"}
                  >
                    <HStack
                      borderBottom={"1px solid silver"}
                      p={"15px"}
                      borderRadius={"15px 15px 0 0 "}
                    >
                      <GrRadialSelected size={"20px"} color={"blue"} />
                      <Text
                        px={"10px"}
                        fontSize={"16px"}
                        fontWeight={"400"}
                        color={"blackAlpha.800"}
                      >
                        Pay by card
                      </Text>
                      <Spacer />
                      <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLVIBJ-2rpBUh0gMNNjNhM759BiZ4ZEEC9BQ&usqp=CAU"
                        width="5%"
                        height="5%"
                        mt="22px"
                        ml="30px"
                      />
                      <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkrA_6LJ0DJucgHSZDOYO8v9n7dGNiJ6OPnw&usqp=CAU"
                        width="7%"
                        height="7%"
                        mt="16px"
                        ml="0px"
                      />
                      <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSapt6bCfFKVEeVMsp5NRz4iOLHcGBqzPtPWw&usqp=CAU"
                        width="4%"
                        height="4%"
                        mt="20px"
                        mr="20px"
                      />
                    </HStack>

                    <Box p={"20px 15px 30px 15px"}>
                      <Flex direction={"column"}>
                        <label
                          style={{
                            marginBottom: "-10px",
                            marginLeft: "15px",
                            fontSize: "14px",
                            fontWeight: "700",
                            backgroundColor: "white",
                            zIndex: "4",
                            width: "150px",
                            paddingLeft: "5px",
                          }}
                        >
                          Cardholder Name
                        </label>
                        <Input
                          name="c_holder"
                          onChange={handleInputChange}
                          autoComplete="on"
                          w={{ base: "80%", md: "45%", lg: "45%" }}
                          size="lg"
                          border={"1px solid silver"}
                        />
                      </Flex>
                      <Flex direction={"column"} my={"20px"}>
                        <label
                          style={{
                            marginBottom: "-10px",
                            marginLeft: "15px",
                            fontSize: "14px",
                            fontWeight: "700",
                            backgroundColor: "white",
                            zIndex: "4",
                            width: "110px",
                            paddingLeft: "5px",
                          }}
                        >
                          Card Number *
                        </label>
                        <Input
                          name="c_number"
                          onChange={handleInputChange}
                          autoComplete="on"
                          w={{ base: "80%", md: "45%", lg: "45%" }}
                          size="lg"
                          border={"1px solid silver"}
                          placeholder="**** **** **** ****"
                        />
                      </Flex>

                      <Flex
                        direction={{ base: "column", md: "row", lg: "row" }}
                      >
                        <Flex
                          direction={"column"}
                          w={{ base: "60%", md: "20%", lg: "20%" }}
                        >
                          <label
                            style={{
                              marginBottom: "-10px",
                              marginLeft: "15px",
                              fontSize: "14px",
                              fontWeight: "700",
                              backgroundColor: "white",
                              zIndex: "4",
                              width: "95px",
                              paddingLeft: "3px",
                            }}
                          >
                            Expiry Date *
                          </label>
                          <Input
                            name="exp_day"
                            onChange={handleInputChange}
                            w={"100%"}
                            size="lg"
                            border={"1px solid silver"}
                            placeholder="MM / YY"
                          />
                        </Flex>
                        <Flex
                          direction={"column"}
                          w={{ base: "60%", md: "20%", lg: "20%" }}
                          ml={{ base: "0%", md: "5%", lg: "5%" }}
                          mt={{ base: "15px", md: "0px", lg: "0px" }}
                        >
                          <label
                            style={{
                              marginBottom: "-10px",
                              marginLeft: "15px",
                              fontSize: "14px",
                              fontWeight: "700",
                              backgroundColor: "white",
                              zIndex: "4",
                              width: "45px",
                              paddingLeft: "3px",
                            }}
                          >
                            CVV *
                          </label>
                          <Input
                            name="cvv"
                            type="password"
                            onChange={handleInputChange}
                            w={"100%"}
                            size="lg"
                            border={"1px solid silver"}
                            placeholder="1 2 3"
                          />
                        </Flex>
                      </Flex>
                    </Box>
                  </Box>

                  <Box mt={"20px"}>
                    <Flex>
                      <Checkbox
                        size="md"
                        onChange={() => {
                          setcheck(!check);
                        }}
                      ></Checkbox>
                      <Text
                        pl={"15px"}
                        mt={"45px"}
                        align={"left"}
                        fontSize={{ base: "14px", md: "16px", lg: "16px" }}
                      >
                        I agree to Adventour's{" "}
                        <span style={{ color: "#008cc9" }}>
                          Terms & Conditions
                        </span>{" "}
                        and{" "}
                        <span style={{ color: "#008cc9" }}>
                          {" "}
                          Privacy Policy;
                        </span>{" "}
                        and Realistic Journey's{" "}
                        <span style={{ color: "#008cc9" }}>
                          {" "}
                          payment,cancellation and refund conditions,
                        </span>{" "}
                        as well as{" "}
                        <span style={{ color: "#008cc9" }}>
                          Credit for Future Tours <br /> Terms & Conditions.
                        </span>
                      </Text>
                    </Flex>
                  </Box>

                  <Button
                    onClick={getData}
                    w={"100%"}
                    colorScheme="none"
                    bg={"teal"}
                    py={"30px"}
                    mt={"30px"}
                    isDisabled={!check}
                  >
                    Book Now
                  </Button>
                  <Modal isOpen={isOpen}>
                    <ModalOverlay>
                      <ModalContent>
                        <ModalBody>
                          <VStack>
                            <Text fontSize={"25px"} fontWeight={"600"}>
                              OTP Verification
                            </Text>
                            <Text fontSize={"15px"}>
                              Thank you for choosing Adventour! Your adventure
                              awaits.
                            </Text>
                            <Text fontSize={"15px"} pb={"20px"}>
                              Please enter the One-Time Password (OTP) you
                              received.
                            </Text>
                            <HStack mt={3} mx={3}>
                              <PinInput>
                                <PinInputField
                                  onChange={(e) => {
                                    setpin({ ...pin, first: e.target.value });
                                  }}
                                />
                                <PinInputField
                                  onChange={(e) => {
                                    setpin({ ...pin, sec: e.target.value });
                                  }}
                                />
                                <PinInputField
                                  onChange={(e) => {
                                    setpin({ ...pin, third: e.target.value });
                                  }}
                                />
                                <PinInputField
                                  onChange={(e) => {
                                    setpin({ ...pin, fourth: e.target.value });
                                  }}
                                />
                              </PinInput>
                            </HStack>
                            <HStack>
                              <Text fontSize={"12px"} pt={"15px"}>
                                Haven't received the OTP yet? Click here to{" "}
                              </Text>
                              <Text
                                onClick={() => {
                                  toast({
                                    description: "Your OTP is 4567",
                                    status: "warning",
                                    position: "top",
                                    duration: 3000,
                                    isClosable: true,
                                  });
                                }}
                                color={"blue.400"}
                                fontWeight={"500"}
                                fontSize={"12px"}
                                pt={"15px"}
                                cursor={"pointer"}
                              >
                                RESEND
                              </Text>
                            </HStack>
                          </VStack>
                        </ModalBody>
                        <Button
                          colorScheme="blue"
                          m={5}
                          onClick={() => {
                            onClose();
                            if (
                              pin.first == 4 &&
                              pin.sec == 5 &&
                              pin.third == 6 &&
                              pin.fourth == 7
                            ) {
                              navigate("/success");
                            } else {
                              toast({
                                description: "Payment failed",
                                status: "error",
                                position: "top",
                                duration: 3000,
                                isClosable: true,
                              });
                            }
                          }}
                        >
                          Enter OTP
                        </Button>
                      </ModalContent>
                    </ModalOverlay>
                  </Modal>
                </Box>
              </Box>
              {/* ==========================================================================> */}
            </Box>

            <Box w={"31%"} display={{ base: "none", md: "none", lg: "block" }}>
              <Box
                display={{ base: "none", md: "none", lg: "block" }}
                p={"20px"}
                borderRadius={"15px"}
                bg={"white"}
                boxShadow={"md"}
                lineHeight={"25px"}
              >
                <Text
                  pb={"15px"}
                  fontSize={"20px"}
                  fontWeight={"700"}
                  align={"left"}
                >
                  Your Adventure Details
                </Text>
                <Text fontSize={"15px"} fontWeight={"600"} align={"left"}>
                  Location
                </Text>
                <Text pb={"10px"} fontSize={"15px"} align={"left"}>
                  Explore the beautiful destination of {data.destination_title},{" "}
                  {data.location}, known for its {data.grade} experiences.
                </Text>
                <Text fontSize={"15px"} fontWeight={"600"} align={"left"}>
                  Duration
                </Text>
                <Text pb={"10px"} fontSize={"15px"} align={"left"}>
                  6 days
                </Text>
                <Text fontSize={"15px"} fontWeight={"600"} align={"left"}>
                  Starts On
                </Text>
                <Text pb={"10px"} fontSize={"15px"} align={"left"}>
                  Tuesday, 12 Sep 2023
                </Text>
                <Text fontSize={"15px"} fontWeight={"600"} align={"left"}>
                  Ends On
                </Text>
                <Text pb={"10px"} fontSize={"15px"} align={"left"}>
                  Monday, 18 Sep 2023
                </Text>
                <Text fontSize={"15px"} fontWeight={"600"} align={"left"}>
                  Trip Type
                </Text>
                <Text pb={"10px"} fontSize={"15px"} align={"left"}>
                  Group Tour
                </Text>
                <Text fontSize={"15px"} fontWeight={"600"} align={"left"}>
                  Language
                </Text>
                <Text pb={"10px"} fontSize={"15px"} align={"left"}>
                  English
                </Text>
                <Text fontSize={"15px"} fontWeight={"600"} align={"left"}>
                  What's Included
                </Text>
                <Text pb={"10px"} fontSize={"15px"} align={"left"}>
                  Enjoy a worry-free journey with comfortable accommodation,
                  expert local guides, delicious authentic meals, and convenient
                  transportation.
                </Text>
              </Box>
              <Price inc={inc} data={data} />
            </Box>
          </Flex>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Payment;
