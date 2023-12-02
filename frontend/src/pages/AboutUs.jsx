import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <main className={styles.aboutUsContainer}>
      <h1>About Us</h1>
      <div className={styles.aboutUsContent}>
        <p>
          Hey there! Welcome to My Student Wellbeing! We&apos;re here to bring
          you closer to the heart of your campus community. Our event directory
          is a response to what you, the students, have been asking for - a
          simpler way to connect and engage with each other.
        </p>
        <p>
          Campus events can have so many benefits; they&apos;re gateways to
          self-discovery, valuable networking, introduction to new hobbies, and
          maybe even lifelong friendships. These experiences are the hidden gems
          of your student life, shaping memories and skills that go beyond
          academics.
        </p>
        <p>
          At My Student Wellbeing, our commitment to you goes beyond just
          events. We care deeply about your overall wellbeing. That&apos;s why
          we&apos;re on a mission to listen, understand, and act on what you
          need to make your student experience the best it can be. We started by
          simplifying access to mental health counselling, and now, we&apos;re
          focusing on enhancing your connections with the campus community.
        </p>
        <p>
          We&apos;re always eager to hear your thoughts. Whether you&apos;re a
          student with ideas on improving campus life or someone with insights
          into enhancing the student experience, we&apos;re all ears.
        </p>
        <p>
          Your feedback drives us. We have plans to expand our services across
          Canada, so if you&apos;re a student or campus community member in an
          area we don&apos;t operate in yet, please connect with us and having a
          connection to your community will allow us to expand there more
          quickly.
        </p>
        <p>
          Let&apos;s start a conversation and shape a better student journey
          together. And don&apos;t forget - enjoy the events, immerse yourself
          in the experiences, and keep checking back for new opportunities to
          connect and grow!
        </p>
      </div>
    </main>
  );
};

export default AboutUs;
