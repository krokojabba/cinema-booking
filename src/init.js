export default () => {
    const state = {
        presentDate: null,
        currentDate: null,
        currentSession: null,
        bookings: [],
        currentSeat: null,
        currentRow: null,
    };
    const defaultBookings = [
        {
            date: new Date(new Date().setDate(new Date().getDate()-1)),
            session: 1,
            row: 1,
            seat: 1
        },
    ];
    try {
        state.bookings = JSON.parse(localStorage.getItem('bookings'));
    } catch (e) {
        console.error(e);
        state.bookings = defaultBookings;
    }
    if (state.bookings === null) state.bookings = defaultBookings;
    console.log(state.bookings);
    return state;
};
