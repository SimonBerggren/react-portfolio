import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  useEffect(() => {
    if (!response) {
      return;
    }

    onOpen(response.type, response.message);

    if (response.type === "success") {
      formik.resetForm();
    }
  }, [response]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireme",
      comment: "",
    },
    onSubmit: (values) => {
      submit("api-url", values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      comment: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
    }),
  });

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
      id="contactme-section"
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1">Contact me</Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={formik.touched.firstName && formik.errors.firstName}
              >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  {...formik.getFieldProps("firstName")}
                  id="firstName"
                  name="firstName"
                  disabled={isLoading}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  {...formik.getFieldProps("email")}
                  id="email"
                  name="email"
                  type="email"
                  disabled={isLoading}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  {...formik.getFieldProps("type")}
                  id="type"
                  name="type"
                  disabled={isLoading}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl
                isInvalid={formik.touched.comment && formik.errors.comment}
              >
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  {...formik.getFieldProps("comment")}
                  id="comment"
                  name="comment"
                  height={250}
                  disabled={isLoading}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spinPulse size="2x" />
                ) : (
                  "Submit"
                )}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;
