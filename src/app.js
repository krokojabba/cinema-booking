export default (state, config) => {
    const form = document.querySelector('form');
    const dateSelect = form.elements.date;
    const sessionSelect = form.elements.session;
    const timeTable = document.querySelector('#timeTable');
    const modal = document.querySelector('#modal');
    const bookBtn = document.querySelector('#bookBtn');

    const currentDate = new Date();
    const presentDate = new Date(currentDate);
    const firstDate = new Date(presentDate.setDate(presentDate.getDate() - config.dateOffset));
    const dates = [new Date(firstDate)];
    for (let i = - config.dateOffset; i < config.dateOffset; i += 1) {
        dates.push(new Date(firstDate.setDate(firstDate.getDate() + 1)));
    }

    dates.forEach((date) => {
        const option = document.createElement('option');
        option.setAttribute('value', date.toISOString());
        option.textContent = date.toLocaleDateString('ru');
        if (date.toDateString() === currentDate.toDateString()) option.selected = true;
        dateSelect.append(option);
    });

    for (let i = 1; i <= config.sessionCount; i +=1) {
        const option = document.createElement('option');
        option.setAttribute('value', i);
        const currentSessionStartDate = new Date((new Date(state.currentDate)).setHours(config.sessionStartTime + config.sessionDuration * (i - 1), 0, 0));
        option.textContent = `${i} - ${currentSessionStartDate.toLocaleTimeString('ru')}`;
        sessionSelect.append(option);
    };

    const tableHead = timeTable.querySelector('thead>tr');
    for (let seat = 1; seat <= config.seatCount; seat += 1) {
        const th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.classList.add('col-1');
        th.textContent = seat;
        tableHead.append(th);
    };

    const tableBody = timeTable.querySelector('tbody');
    for (let row = 1; row <= config.rowCount; row += 1) {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.classList.add('col-1');
        th.textContent = row;
        tr.append(th);

        for (let seat = 1; seat <= config.seatCount; seat += 1) {
            const td = document.createElement('td');
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-primary', 'w-100', 'h-100');
            btn.type = 'button';
            btn.dataset.bsTarget = '#modal';
            btn.dataset.bsToggle = 'modal';
            btn.dataset.row = row
            btn.dataset.seat = seat;
            td.append(btn);
            tr.append(td);
        };
        tableBody.append(tr);
    };

    state.presentDate = new Date(presentDate);
    state.currentDate = new Date(currentDate);
    state.currentSession = config.defaultCurrentSession;


    dateSelect.addEventListener('input', () => {
        state.currentDate = new Date(dateSelect.value);
        state.currentSession = config.defaultCurrentSession;
    });

    sessionSelect.addEventListener('input', () => {
        state.currentSession = parseInt(sessionSelect.value, 10);
    });

    modal.addEventListener('show.bs.modal', (e) => {
        const { relatedTarget: { dataset: { row: currentRow, seat: currentSeat } } } = e;
        state.currentRow = parseInt(currentRow, 10);
        state.currentSeat = parseInt(currentSeat, 10);
    });

    
    bookBtn.addEventListener('click', () => {
        state.bookings.push(
            {
                date: new Date(state.currentDate),
                session: state.currentSession,
                row: state.currentRow,
                seat: state.currentSeat
            }
        )
        localStorage.setItem('bookings', JSON.stringify(state.bookings));
    });
};