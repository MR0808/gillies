import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    pixelBasedPreset,
    Row,
    Section,
    Tailwind,
    Text
} from '@react-email/components';

interface WelcomeEmailTemplateProps {
    name?: string;
    link?: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const WelcomeEmailTemplate = ({
    name,
    link
}: WelcomeEmailTemplateProps) => {
    return (
        <Html>
            <Head />
            <Tailwind
                config={{
                    presets: [pixelBasedPreset],
                    theme: {
                        extend: {
                            colors: {
                                brand: '#2250f4',
                                offwhite: '#fafbfb'
                            },
                            spacing: {
                                0: '0px',
                                20: '20px',
                                45: '45px'
                            }
                        }
                    }
                }}
            >
                <Preview>Welcome to the Gillies Voting Portal </Preview>
                <Body className="bg-offwhite font-sans text-base">
                    <Container className="bg-white p-45">
                        <Heading className="my-0 text-center leading-8">
                            Gillies Voting Portal
                        </Heading>

                        <Section>
                            <Row>
                                <Text className="text-base">Hi {name},</Text>
                                <Text className="text-base">
                                    Welcome to the{' '}
                                    <span className="font-bold">
                                        Gillies Voting Portal
                                    </span>{' '}
                                    — we&apos;re really excited to have you
                                    here! 🎉
                                </Text>
                                <Text className="text-base">
                                    You are now part of the Gillies Batman
                                    Branch voting group, able to vote for the
                                    whiskies at our next meeting. Please cink on
                                    the link below to setup your account and
                                    create a password.
                                </Text>
                            </Row>
                        </Section>

                        <Section className="text-center mt-10">
                            <Button
                                className="rounded-lg bg-brand px-[18px] py-3 text-white"
                                href={link}
                            >
                                Activate My Account
                            </Button>
                        </Section>

                        <Section>
                            <Row>
                                <Text className="text-base">
                                    Cheers
                                    <br />
                                    Mark
                                </Text>
                            </Row>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

WelcomeEmailTemplate.PreviewProps = {
    name: 'Alan',
    link: 'http://www.google.com/'
} satisfies WelcomeEmailTemplateProps;

export default WelcomeEmailTemplate;

const footerText = {
    fontSize: '12px',
    color: '#b7b7b7',
    lineHeight: '15px',
    textAlign: 'left' as const,
    marginBottom: '50px'
};
