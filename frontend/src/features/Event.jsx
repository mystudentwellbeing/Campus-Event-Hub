import styles from './Event.module.css';

const Event = ({
  image_url,
  name_of_event,
  price,
  date,
  time,
  type,
  short_description,
}) => {
  return (
    <div className={styles.event}>
      <img className={styles.eventImage} src={image_url} alt="EventImage" />
      <div className={styles.eventHeader}>
        <h4>{name_of_event}</h4>
        <h3>{price} &nbsp; Like</h3>
      </div>
      <p>
        {date} and {time}
      </p>
      <p className={styles.eventType}>{type}</p>
      <p>{short_description}</p>
    </div>
  );
};

export default Event;
