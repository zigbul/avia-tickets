export function ticketNormalize(arrOTicket) {

   function setKey() {
      return `_${Math.random().toString(36).substr(2, 9)}`;
   };

   function dateFormater(date) {
      const dateArr = `${date}`.slice(0, 10).split(" ").reverse();
      const formatedArr = dateArr.map((item, index) => {
         if(index === 1) {
            switch(item) {
               case 'Jan':
                  item = 'янв.';
                  break;
               case 'Feb':
                  item = 'фев.';
                  break;
               case 'Mar':
                  item = 'мар.';
                  break;
               case 'Apr':
                  item = 'апр.';
                  break;
               case 'May':
                  item = 'май';
                  break;
               case 'Jun':
                  item = 'июн.';
                  break;
               case 'Jul':
                  item = 'июл.';
                  break;
               case 'Aug':
                  item = 'авг.';
                  break;
               case 'Sep':
                  item = 'сен.';
                  break;
               case 'Nov':
                  item = 'ноя.';
                  break;
               case 'Dec':
                  item = 'дек.';
                  break;
               default:
                  break;
            }
         }
         if(index === 2) {
            switch(item) {
               case "Mon":
                  item = 'пн';
                  break;
               case "Tue":
                  item = 'вт';
                  break;
               case 'Wed':
                  item = 'ср';
                  break;
               case 'Thu':
                  item = 'чт';
                  break;
               case 'Fri':
                  item = 'пт';
                  break;
               case 'Sat':
                  item = 'сб';
                  break;
               case 'Sun':
                  item = 'вс';
                  break;
               default:
                  break;
            }
         }
         return item;
      }).join(' ');
      return formatedArr;
   }

   function timeOutIn(date, time) {

      let dateOut = new Date(date);
      let dateIn = new Date(dateOut.setMinutes(dateOut.getMinutes() + time));
      const outHours = dateOut.getHours();
      const outMinutes = dateOut.getMinutes();
      const inHours = new Date(dateOut.setHours(dateOut.getHours() + Math.ceil(time/60))).getHours();
      const inMinutes = new Date(dateOut.setMinutes(dateOut.getMinutes() + time)).getMinutes();

      return { 
            departureTime: `${outHours}:${outMinutes}`,
            departureDate: `${dateFormater(dateOut)}`, 
            arrivalTime: `${inHours}:${inMinutes}`,
            arrivalDate: `${dateFormater(dateIn)}`};
   }

   function timeInTrack(duration) {
      return `${Math.ceil(duration / 60)} ч ${(duration % 60)} мин`;
   }

   function stops(stops) {
      switch (stops.length - 1) {
         case 0: 
            return "Без пересадок";
         case 1: 
            return "1 пересадка";
         default: 
            return `${stops.length - 1} пересадки`;
      };
   };

   function outIn(arrOutIn) {
      return arrOutIn.map((way) => {
         return {
            id: setKey(),
            departureCity: `${way.segments[0].departureCity && way.segments[0].departureCity.caption}, ${way.segments[0].departureAirport.caption}`,
            departureUid: `(${way.segments[0].departureAirport.uid})`,
            arrivalCity: `${way.segments[way.segments.length - 1].arrivalCity && way.segments[way.segments.length - 1].arrivalCity.caption}, ${way.segments[way.segments.length - 1].arrivalAirport.caption}`,
            arrivalUid: `(${way.segments[way.segments.length - 1].arrivalAirport.uid})`,
            dates: timeOutIn(way.segments[0].departureDate, way.duration),
            timeInFlight: timeInTrack(way.duration),
            stops: stops(way.segments),
         };
      });
   };

   return arrOTicket.map((ticket) => {
      return {
         id: ticket.flightToken,
         price: +ticket.flight.price.total.amount,
         logo: `//pics.avs.io/99/36/${ticket.flight.carrier.uid}.png`,
         carrier: ticket.flight.carrier.caption,
         segments: outIn(ticket.flight.legs),
         duration: ticket.flight.legs[0].duration + ticket.flight.legs[1].duration,
      };
   });
};