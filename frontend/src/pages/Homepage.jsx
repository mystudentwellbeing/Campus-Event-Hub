import Event from './Event';
import eventsData from '../data/events.json';
import styles from './Homepage.module.css';

// Access the 'events' array within the 'events' object
const events = eventsData.events;
// Check the structure of 'events' here
console.log(events);

const HomePage = () => {
  //return <div>HomePage</div>;
  return (
    <main className={styles.homepage}>
      <div className={styles.serchbar}>
        <div>
          <p className={styles.serchbox}>Search Events!</p>
        </div>
        <div className={styles.filtericons}>
          <button>NETWORKING</button>
          <button>CAMPUS</button>
          <button>CULTURAL</button>
          <button>HOBBIES</button>
          <button>SPORTS</button>
          <button>EDUCATIONAL</button>
          <button>NIGHTLIFE</button>
          <button>ARTS</button>
          <button>WELLBEING</button>
        </div>
      </div>
      <div className={styles.allevents}>
        {events.map((event, index) => (
          <Event
            key={index}
            image_url={event.image_url}
            name_of_event={event.name_of_event}
            price={event.price}
            date={event.date}
            time={event.time}
            type={event.type}
            short_description={event.short_description}
          />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
