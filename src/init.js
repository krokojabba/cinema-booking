export default () => {
    const state = {
        presentDate: null,
        currentDate: null,
        currentSession: null,
        bookings: [],
        currentSeat: null,
        currentRow: null,
    };

    try {
        state.bookings = JSON.parse(localStorage.getItem('bookings'));
    } catch (e) {
        state.bookings = [
            {
                date: new Date(),
                session: 1,
                row: 1,
                seat: 1
            },
        ];
    }
    console.log(state.bookings);
    return state;
};
