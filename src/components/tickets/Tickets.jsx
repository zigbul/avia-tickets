import React, { useCallback, useEffect, useState } from 'react';
import styles from './tickets.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSortedTickets } from '../../store/ticketReducer';
import { ticketNormalize } from '../../utils/helper';
import { fetchTickets } from '../../asyncActions/ticketsAction';
import arrow from '../../assets/right-arrow.svg';

const TicketList = () => {

   const tickets = useSelector(state => state.tickets.tickets);
   const sortedTickets = useSelector(state => state.tickets.sortedTickets);
   const sort = useSelector(state => state.sort.sorted);
   const filter = useSelector(state => state.sort.filterByStops);
   const minPrice = +useSelector(state => state.sort.filterByPrice.minValue);
   const maxPrice = +useSelector(state => state.sort.filterByPrice.maxValue);
   const companyFilter = useSelector(state => state.sort.filterByCompany);

   const [showMore, setShowMore] = useState({isActive: false, ticketsNumber: 2});

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchTickets());
   }, [dispatch]);

   const sortBy = useCallback(tickets => {
      const newTicketArr = [...tickets];
      if(sort.toHigherPrice) {
         return newTicketArr.sort((a, b) => a.price - b.price);
      }
      if(sort.toLowerPrice) {
         return newTicketArr.sort((a, b) => b.price - a.price);
      }
      if(sort.toTimeInFlight) {
         return newTicketArr.sort((a, b) => a.duration - b.duration);
      }
   }, [sort.toHigherPrice, sort.toLowerPrice, sort.toTimeInFlight]);

   const filterByStops = useCallback(tickets => {
      return tickets.filter(ticket => {
         if(filter.all) return true;
         if(filter.oneStop && ticket.segments[0].stops === '1 пересадка' && ticket.segments[1].stops === '1 пересадка') return true;
         if(filter.noStops && ticket.segments[0].stops === 'Без пересадок' && ticket.segments[1].stops === 'Без пересадок') return true;
         return false;
      })
   }, [filter.noStops, filter.oneStop, filter.all]);

   const filterByPrice = useCallback(tickets => {
      return tickets.filter(ticket => {
         if(minPrice ===0 && maxPrice === 0) return true;
         if(minPrice > maxPrice && (minPrice !== 0 && maxPrice !== 0)) return false;
         if(minPrice === 0 && maxPrice !== 0) return ticket.price < maxPrice;
         if(minPrice !== 0 && maxPrice === 0) return ticket.price > minPrice;
         if(minPrice !== 0 && maxPrice !== 0) return ticket.price > minPrice && ticket.price < maxPrice;
         return false;
      })
   }, [minPrice, maxPrice]);

   const filterByCompany = useCallback(tickets => {
      return tickets.filter(ticket => {
         if(companyFilter.all) return true;
         if(companyFilter.LOT && ticket.carrier === 'LOT Polish Airlines') return true;
         if(companyFilter.Aeroflot && ticket.carrier === 'Аэрофлот - российские авиалинии') return true;
         return false;
      })
   }, [companyFilter.all, companyFilter.LOT, companyFilter.Aeroflot]);

   useEffect(() => {
      dispatch(setSortedTickets(filterByCompany(filterByPrice(filterByStops(sortBy(ticketNormalize(tickets)))))));
   }, [dispatch, tickets, sortBy, filterByStops, filterByPrice, filterByCompany]);

   if (sortedTickets.length === 0) {
      return (
         <div className={styles.container}>
            <p className={styles.text}>NO TICKETS</p>
         </div> 
      )
   }

   return (
      <div className={styles.container}>
         <main className={styles.main}>
            {sortedTickets.slice(0, showMore.ticketsNumber).map(({carrier, id, logo, price, segments}) => (
               <article key={id} className={styles.ticket}>
                  <header className={styles.ticket__header}>
                     <img src={logo} alt="logo" />
                     <div className={styles['ticket__price-block']}>
                        <p>{price} Р</p>
                        <p>Стоимость для одного взрослого пассажира</p>
                     </div>
                  </header>
                  <section className={styles.ticket__body}>
                     {segments.map(({ dates, id, arrivalCity, departureCity, timeInFlight, stops, arrivalUid, departureUid }) => (
                        <section key={id}>
                           <div className={styles.ticket__destination}>
                              <p>{departureCity}<span className={styles.ticket__uid}> {departureUid}</span></p>
                              <img src={arrow} alt="arrow" width="30" className={styles.ticket__arrow} />
                              <p>{arrivalCity} <span className={styles.ticket__uid}> {arrivalUid}</span></p>
                           </div>
                           <div className={styles.ticket__data}>
                              <p className={styles['ticket__time']}>{dates.departureTime}<span className={styles['ticket__date']}> {dates.departureDate}</span></p>
                              <p className={styles['ticket__time-in-flight']}>{timeInFlight}</p>
                              <p className={styles['ticket__time']}><span className={styles['ticket__date']}> {dates.arrivalDate}</span> {dates.arrivalTime}</p>
                           </div>
                           <p className={styles.ticket__stops}>{stops}</p>
                           <p className={styles.ticket__executor}>Рейс выполняет: {carrier}</p>
                        </section>
                     ))}
                  </section>
                  <button className={styles.ticket__btn}>Выбрать</button>
               </article>
            ))}
         </main>
         <button 
            className={styles['more-btn']}
            onClick={() => showMore.isActive ? setShowMore({isActive: false, ticketsNumber: 2}) : setShowMore({isActive: true, ticketsNumber: -1})}
         >
            {showMore.isActive ? 'Свернуть' : 'Показать еще' }
         </button>
      </div>
   );
};

export default TicketList;
