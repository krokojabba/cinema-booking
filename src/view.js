import onChange from 'on-change';

const renderSessionSelect = (sessionSelect, config) => {
    sessionSelect.querySelectorAll('option').forEach((option) => {
        if (option.getAttribute('value') === config.defaultCurrentSession) option.selected = true;
        else option.selected = false;
    });
};

const renderTimeTable = (timeTable, state, config) => {
    const isEqualDate = (date1, date2) => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    const presentDate = new Date();
    timeTable.querySelectorAll('button').forEach((button) => {
        button.disabled = false;
        button.classList.remove('btn-secondary', 'btn-primary', 'btn-dark');
        // const { dataset: { row: currentRow, seat: currentSeat } } = button;
        const currentRow = parseInt(button.dataset.row, 10);
        const currentSeat = parseInt(button.dataset.seat, 10);
        const isBooked = state.bookings.find((booking) => isEqualDate(new Date(booking.date), state.currentDate) && booking.session === state.currentSession && booking.row === currentRow && booking.seat === currentSeat) ? true : false;
        const currentSessionStartDate = new Date((new Date(state.currentDate)).setHours(config.sessionStartTime + config.sessionDuration * (state.currentSession - 1), 0, 0));
        /* console.log(currentSessionStartDate.toLocaleString('ru'));
        console.log(presentDate.toLocaleString('ru')); */
        const isInPast = currentSessionStartDate - presentDate < 0;
        if (isBooked) button.classList.add('btn-dark');
        else if (isInPast) button.classList.add('btn-secondary');
        else button.classList.add('btn-primary');
        if (isBooked || isInPast) button.disabled = true;
    });
};

const renderModal = (modal, state) => {
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <p>Date: ${state.currentDate.toLocaleDateString('ru')}</p>
        <p>Session: ${state.currentSession}</p>
        <p>Row: ${state.currentRow}</p>
        <p>Seat: ${state.currentSeat}</p>
    `;
};

export default (initState, config) => {
    const form = document.querySelector('form');
    const sessionSelect = form.elements.session;
    const timeTable = document.querySelector('#timeTable');
    const modal = document.querySelector('#modal');

    const state = onChange(initState, (path, current, previous) => {
        console.log(`${path}: '${previous}' => '${JSON.stringify(current, null, 2)}'`);
        switch (path) {
            case 'currentDate': {
                renderSessionSelect(sessionSelect, config);
                renderTimeTable(timeTable, state, config);
                break;
            }
            case 'currentSession':
            case 'bookings': {
                renderTimeTable(timeTable, state, config);
                break;
            }
            case 'currentRow':
            case 'currentSeat': {
                renderModal(modal, state);
                break;
            }
            default:
                break;
        }
    }
    );
    return state;
};
