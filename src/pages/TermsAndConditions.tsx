import {
  UnorderedList,
  ListItem,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/react";

const TermsAndConditions = () => {
  return (
    <Stack p={10}>
      <Heading textAlign="center" fontSize="xl" fontWeight="bold">
        Terms and Conditions
      </Heading>

      <Text mt={4}>
        Please read these terms and conditions carefully before using our
        services.
      </Text>

      <UnorderedList mt={4}>
        <ListItem>
          <Text fontWeight="bold">1. Acceptance of Terms:</Text>
          <Text>
            By accessing or using the services provided by Saylani Mass IT
            Training Centre, you agree to comply with and be bound by these
            terms and conditions.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">2. User Responsibilities:</Text>
          <Text>
            Users are responsible for maintaining the confidentiality of their
            account information, including passwords, and for all activities
            that occur under their account.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">3. Intellectual Property:</Text>
          <Text>
            All content and materials on our website, including but not limited
            to text, graphics, logos, images, and software, are the property of
            Saylani Mass IT Training Centre and are protected by intellectual
            property laws.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">4. Prohibited Activities:</Text>
          <Text>
            Users are prohibited from engaging in any unlawful activities,
            including but not limited to the unauthorized use of our services,
            infringement of intellectual property rights, and any form of
            harassment.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">5. Limitation of Liability:</Text>
          <Text>
            Saylani Mass IT Training Centre is not liable for any direct,
            indirect, incidental, special, or consequential damages resulting
            from the use or inability to use our services.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">6. Privacy Policy:</Text>
          <Text>
            Your use of our services is also governed by our Privacy Policy.
            Please review the Privacy Policy to understand our practices
            regarding the collection and use of your personal information.
          </Text>
        </ListItem>

        <ListItem>
          <Text fontWeight="bold">7. Changes to Terms:</Text>
          <Text>
            Saylani Mass IT Training Centre reserves the right to modify or
            revise these terms and conditions at any time. Users are responsible
            for regularly reviewing these terms. Continued use of our services
            after changes constitutes acceptance of the updated terms.
          </Text>
        </ListItem>
      </UnorderedList>

      <Text mt={4}>
        If you have any questions or concerns about these terms and conditions,
        please contact us at [Contact Information].
      </Text>
    </Stack>
  );
};

export default TermsAndConditions;
