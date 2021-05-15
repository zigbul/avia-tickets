import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSorted, setFilterByStops, setFilterByPrice, setFilterByCompany } from '../../store/sortReducer';
import styles from './sidebar.module.scss';

const Sidebar = () => {
   const sort = useSelector(state => state.sort.sorted);
   const filter = useSelector(state => state.sort.filterByStops);
   const filterByPrice = useSelector(state => state.sort.filterByPrice);
   const filterByCompany = useSelector(state => state.sort.filterByCompany);

   const dispatch = useDispatch();

   useEffect(() => {
      if((!filter.oneStop && !filter.noStops) && !filter.all) {
         dispatch(setFilterByStops({...filter, all: true}));
      }
      if((!filterByCompany.LOT && !filterByCompany.Aeroflot) && !filterByCompany.all) {
         dispatch(setFilterByCompany({...filterByCompany, all: true}));
      }
   }, [dispatch, filter, filterByCompany]);

   return (
      <aside className={styles.sidebar}>
         <section className={styles['sidebar__section']}>
            <h2 className={styles.sidebar__title}>Сортировать</h2>
            <label className={styles['sidebar__radio-label']}>
               <input 
                  className={styles.sidebar__radio}
                  type="radio" 
                  name="radio" 
                  checked={sort.toHigherPrice}
                  onChange={() => dispatch(setSorted({toHigherPrice: true, toLowerPrice: false, toTimeInFlight: false}))} 
               />
               <span className={styles['sidebar__custom-radio']}/> 
               - по возрастанию цены
            </label>
            <label className={styles['sidebar__radio-label']}>
               <input 
                  className={styles.sidebar__radio}
                  type="radio" 
                  name="radio"
                  checked={sort.toLowerPrice}
                  onChange={() => dispatch(setSorted({toHigherPrice: false, toLowerPrice: true, toTimeInFlight: false}))}  
               />
               <span className={styles['sidebar__custom-radio']}/>
                - по убыванию цене
            </label>
            <label className={styles['sidebar__radio-label']}>
               <input
                  className={styles.sidebar__radio} 
                  type="radio" 
                  name="radio"
                  checked={sort.toTimeInFlight}
                  onChange={() => dispatch(setSorted({toHigherPrice: false, toLowerPrice: false, toTimeInFlight: true}))}   
               />
               <span className={styles['sidebar__custom-radio']}/> 
               - по времени в пути
            </label>
         </section>
         <section className={styles['sidebar__section']}>
            <h2 className={styles.sidebar__title}>Фильтровать</h2>
            <label>
               <input 
                  type="checkbox"
                  checked={filter.oneStop}
                  onChange={() => dispatch(setFilterByStops({...filter, oneStop: !filter.oneStop, all: false}))} 
               /> - 1 пересадка
            </label>
            <label>
               <input 
                  type="checkbox"
                  checked={filter.noStops}
                  onChange={() => dispatch(setFilterByStops({...filter, noStops: !filter.noStops, all: false}))}
               /> - без пересадок
            </label>
         </section>
         <section className={styles['sidebar__section']}>
            <h2 className={styles.sidebar__title}>Цена</h2>
            <label>
               От <input type="number"
                     value={filterByPrice.minValue}
                     name="minValue"
                     onChange={(e) => dispatch(setFilterByPrice({...filterByPrice, [e.target.name]: e.target.value}))}
                  />
            </label>
            <label>
               До <input 
                     type="number"
                     value={filterByPrice.maxValue}
                     name="maxValue"
                     onChange={(e) => dispatch(setFilterByPrice({...filterByPrice, [e.target.name]: e.target.value}))}
                  />
            </label>
         </section>
         <section className={styles['sidebar__section']}>
            <h2 className={styles.sidebar__title}>Авиакомпании</h2>
            <label className={styles.truncate}>
               <input 
                  type="checkbox" 
                  name="LOT"
                  checked={filterByCompany.LOT}
                  onChange={(e) => dispatch(setFilterByCompany({...filterByCompany, [e.target.name]: !filterByCompany.LOT, all: false}))}
               /> - LOT Polish Airlines от 21049 р.
            </label>
            <label className={styles.truncate}>
               <input 
                  type="checkbox" 
                  name="Aeroflot"
                  checked={filterByCompany.Aeroflot}
                  onChange={(e) => dispatch(setFilterByCompany({...filterByCompany, [e.target.name]: !filterByCompany.Aeroflot, all: false}))} 
               /> - Аэрофлот - российские авиалинии от 31733 р.
            </label>
         </section>
      </aside>
   );
};

export default Sidebar;

