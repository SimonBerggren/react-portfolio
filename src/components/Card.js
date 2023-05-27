import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <VStack
      style={{
        borderRadius: "8px",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Image style={{ borderRadius: "8px" }} src={imageSrc} />
      <VStack style={{ padding: "16px", alignItems: "start" }}>
        <Heading size="md">{title}</Heading>
        <Text fontSize="lg" color="gray" style={{ margin: "12px 0" }}>
          {description}
        </Text>
        <HStack>
          <Text>See more</Text>
          <FontAwesomeIcon icon={faArrowRight} />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;
