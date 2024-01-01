import React from "react";
import {
  UnorderedList,
  ListItem,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";

const Privacy: React.FC = () => {
  return (
    <Stack h="calc(100vh - 70px)" p={10}>
      <Heading textAlign="center">Privacy</Heading>
      <UnorderedList>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold">
            1. Information We Collect:
          </Text>
          <UnorderedList>
            <ListItem>
              <Text>
                <strong>1.1 Personal Information:</strong> We may collect
                personal information, including but not limited to names,
                contact details, and identification information, when you
                register for our courses, subscribe to our newsletters, or
                interact with our website.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>1.2 Usage Information:</strong> We collect information
                about your interactions with our website, such as the pages you
                visit, the links you click on, and the duration of your visit.
                This information helps us improve our services and user
                experience.
              </Text>
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold">
            2. How We Use Your Information:
          </Text>
          <UnorderedList>
            <ListItem>
              <Text>
                <strong>2.1 Course Registration:</strong> We use the personal
                information you provide during course registration to manage
                your enrollment, provide educational materials, and communicate
                important information about your courses.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>2.2 Communication:</strong> We may use your contact
                information to send you updates, newsletters, and relevant
                information about our training programs. You can opt-out of
                these communications at any time.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                <strong>2.3 Analytics:</strong> We analyze usage information to
                understand how users interact with our website and improve its
                functionality, content, and navigation.
              </Text>
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold">
            3. Information Sharing:
          </Text>
          <Text>
            We do not sell, rent, or trade your personal information to third
            parties. We may share your information with trusted service
            providers who assist us in delivering our services, but they are
            obligated to keep the information confidential.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold">
            4. Security:
          </Text>
          <Text>
            We take appropriate measures to protect your personal information
            from unauthorized access, disclosure, alteration, and destruction.
            We use industry-standard security practices and technologies to
            safeguard your data.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold">
            5. Cookies and Similar Technologies:
          </Text>
          <Text>
            We may use cookies and similar technologies to enhance your browsing
            experience and collect information about how you use our website.
            You can manage your cookie preferences through your browser
            settings.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold">
            6. Your Choices:
          </Text>
          <Text>
            You have the right to access, correct, or delete your personal
            information. If you have any concerns about the information we hold
            or its use, please contact us using the information provided below.
          </Text>
        </ListItem>
        <ListItem>
          <Text fontSize="lg" fontWeight="bold">
            7. Updates to the Privacy Policy:
          </Text>
          <Text>
            We may update this Privacy Policy to reflect changes in our
            practices. We encourage you to review this policy periodically for
            any updates.
          </Text>
        </ListItem>
      </UnorderedList>
      {/* <Text>
        At Saylani Mass IT Training Centre, we are committed to protecting the
        privacy and confidentiality of your personal information. This Privacy
        Policy outlines how we collect, use, disclose, and safeguard your
        information when you visit our website, use our services, or interact
        with us in any way.
        <br />
        1. Information We Collect:
        <br />
        1.1 Personal Information: We may collect personal information, including
        but not limited to names, contact details, and identification
        information, when you register for our courses, subscribe to our
        newsletters, or interact with our website. 1.2 Usage Information: We
        collect information about your interactions with our website, such as
        the pages you visit, the links you click on, and the duration of your
        visit. This information helps us improve our services and user
        experience.
        <br /> 2. How We Use Your Information:
        <br />
        2.1 Course Registration: We use the personal information you provide
        during course registration to manage your enrollment, provide
        educational materials, and communicate important information about your
        courses. 2.2 Communication: We may use your contact information to send
        you updates, newsletters, and relevant information about our training
        programs. You can opt-out of these communications at any time. 2.3
        Analytics: We analyze usage information to understand how users interact
        with our website and improve its functionality, content, and navigation.
        <br />
        3. Information Sharing: We do not sell, rent, or trade your personal
        information to third parties. We may share your information with trusted
        service providers who assist us in delivering our services, but they are
        obligated to keep the information confidential.
        <br />
        4. Security: We take appropriate measures to protect your personal
        information from unauthorized access, disclosure, alteration, and
        destruction. We use industry-standard security practices and
        technologies to safeguard your data.
        <br />
        5. Cookies and Similar Technologies: We may use cookies and similar
        technologies to enhance your browsing experience and collect information
        about how you use our website. You can manage your cookie preferences
        through your browser settings.
        <br />
        6. Your Choices: You have the right to access, correct, or delete your
        personal information. If you have any concerns about the information we
        hold or its use, please contact us using the information provided below.
        <br />
        7. Updates to the Privacy Policy: We may update this Privacy Policy to
        reflect changes in our practices. We encourage you to review this policy
        periodically for any updates. 8. Contact Information: If you have
        questions or concerns about our Privacy Policy, please contact us at:
        Saylani Mass IT Training Centre [Address] [Email] [Phone] By using our
        services or interacting with us, you consent to the terms of this
        Privacy Policy. Note: This is a generic template and should be
        customized to reflect the specific practices and requirements of Saylani
        Mass IT Training Centre.
      </Text> */}
    </Stack>
  );
};

export default Privacy;
