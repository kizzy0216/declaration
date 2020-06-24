import Link from 'next/link';

import IndexPageHero from '~/components/IndexPageHero';
import StatementSection from '~/components/StatementSection';
import OffsetFeatureSection from '~/components/OffsetFeatureSection';
import GalleryGridSection from '~/components/GalleryGridSection';
import ListSection from '~/components/ListSection';
import ImageBreakSection from '~/components/ImageBreakSection';
import CarouselSection from '~/components/CarouselSection';
import Footer from '~/components/Footer';

function IndexPage() {
  return (
    <div className="index-page">
      <main>
        <IndexPageHero />
        <StatementSection
          heading="The fastest way to succeed is to learn from those that came before."
          subHeading="Our goal is to unite individuals, help each learn from
          the other, make new mistakes (instead of repeating old ones), and bring
          about an evolutionary leap in how knowledge is exchanged."
        />
        <OffsetFeatureSection
          imgSrc="/images/mockup-real-phone.jpg"
          heading="Ask questions and get answers in real time."
          subHeading="Remove the clutter that exists on social networks and allow
          your members to crowdsource their questions to a refined audience
          specific to their needs."
        />
        <StatementSection
          heading="Life is an infinite loop between teaching and learning.
          Declaration’s platform features were built to optimize this loop
          enabling your members to get help and give help, in school and beyond.
          Nourishing and being nourished. Inspiring and being inspired."
        />
        <GalleryGridSection
          items={[
            '/images/selling-point-01.jpg',
            '/images/selling-point-02.jpg',
            '/images/selling-point-03.jpg',
            '/images/selling-point-04.jpg',
            '/images/selling-point-05.jpg',
            '/images/selling-point-06.jpg',
            '/images/selling-point-07.jpg',
            '/images/selling-point-08.jpg',
            '/images/selling-point-09.jpg',
          ]}
        />
        <ImageBreakSection
          imgSrc="/images/venn.jpg"
        />
        <ListSection
          items={[
            {
              heading: 'Request a space',
              subHeading: (
                <span>
                  Add your collective, organization or business to our platform
                  by filling out a&nbsp;
                  <Link href="/request-network"><a href="link">request to join form</a></Link>
                  &nbsp;and if accepted our CEO will contact you directly to
                  begin the onboarding process.
                </span>
              ),
            },
            {
              heading: 'Invite your members',
              subHeading: 'Easily add individual members, or hundreds at a time, by uploading a CSV and send automatic email invitations to join your space with one click.',
            },
            {
              heading: 'Increase your revenue',
              subHeading: 'Set your own membership prices, create paid events and receive an additional 2% from each paid member session.  Declaration only charges 2.9% per transaction plus a credit card processing fee (2.9% + $.30).',
            }
          ]}
        />
        <CarouselSection
          heading="Built for those who dare to be great."
          items={[
            '/images/mockup-01.jpg',
            '/images/mockup-02.jpg',
            '/images/mockup-03.jpg',
            '/images/mockup-04.jpg',
            '/images/mockup-05.jpg',
            '/images/mockup-06.jpg',
            '/images/mockup-07.jpg',
            '/images/mockup-08.jpg',
            '/images/mockup-09.jpg',
            '/images/mockup-10.jpg',
            '/images/mockup-11.jpg',
            '/images/mockup-12.jpg',
            '/images/mockup-13.jpg',
          ]}
        />
        <ImageBreakSection
          imgSrc="/images/mockup-dashboard.png"
          maxWidthType="outer"
        />
        <OffsetFeatureSection
          imgSrc="/images/action-shot.jpg"
          heading="Fight on."
          subHeading="Declaration is still in its early stages, but know that we
          built this product with deliberate intention to support each member
          when they need it the most. You are never alone when facing a difficult
          challenge. Tap advisors when you need help, develop a plan of action,
          and keep moving forward."
          offsetX="-25%"
        />
      </main>

      <Footer />

      <style jsx>{`
      `}</style>
    </div>
  )
}

export default IndexPage;
