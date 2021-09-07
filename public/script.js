$(document).ready( function () {
    // DataTable
    const table = $('#bigThreeTable').DataTable({
        ajax: {
            url: '/big3',
            type: 'GET',
            dataType: 'json',
            dataSrc: ''
        },
        columns: [
            {
                data: 'Sun'
            },
            {
                data: 'Moon'
            },
            {
                data: 'Rising'
            },
            {
                // DataTable About button
                data: null,
                className: 'dt-right',
                render: function(data, type, row){
                    const sun = row.Sun.slice(2);
                    const moon = row.Moon.slice(2);
                    const rising = row.Rising.slice(2);
                    return `<a href='/big3/details?sun=${sun}&moon=${moon}&rising=${rising}' class='btn btn-outline-secondary w-100'>About</a>`;
                }
            }
        ],
        ordering: false,
        responsive: true,
        // Function for searching items in table
        initComplete: function () {
            this.api().columns().every(function () {
                let that = this;
                $('.search-select', this.header()).on('change', function () {
                    if (that.search() !== this.value) {
                        that
                            .search(this.value)
                            .draw();
                    }
                });
            });
        },
        // Remove search input in DataTable
        "dom": '<"top"l>rt<"bottom"ip><"clear">'
    });
    // Styling DataTable elements
    $('#bigThreeTable_length').addClass('px-2');
    $('#bigThreeTable_info').addClass('px-2 py-0');
    $('#bigThreeTable_paginate').addClass('d-flex justify-content-center my-4');

    // Refresh DataTable
    $('#refresh_tbl-btn').on('click', () => {
        table.page(0);
        $('.search-select').prop('selectedIndex', 0);
        $('#bigThreeTable_length select').prop('selectedIndex', 0);
        $('.search-select').trigger('change');
        $('#bigThreeTable_length select').trigger('change');
    });

    // Back to previous page
    $('.back-btn').on('click', () => {
        window.history.back();
    });

    // On sign select from horoscope menu open modal and load data in it
    $('#horoscopeSelect').on('change', async (e) => {
        // if selected item is not default item in select list
        if(e.target.selectedIndex !== 0) {
            // Open modal window
            $('#horoscopeModal').modal('show');
            // Get selected item from event object
            const urlParam = e.target.value.toLowerCase();
            // Set loading message   
            $('#horoscopeModal .modal-body').append('<p class="lead text-center text-light">Loading...</p>');
            // Get horoscope data and fill modal window with its values
            $.get(`/big3/horoscope/${urlParam}`, function(data) {
                // Remove loading message
                $('#horoscopeModal .modal-body').html('');
                // Append values to modal window
                $('#horoscopeModal .modal-title').text(e.target.value);
                $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Current Date:</span> ${data.current_date}</p>`);
                $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Description:</span> ${data.description}</p>`);
                $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Compatibility:</span> ${data.compatibility}</p>`);
                $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Mood:</span> ${data.mood}</p>`);
                $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Color:</span> ${data.color}</p>`);
                $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Lucky Number:</span> ${data.lucky_number}</p>`);
                $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Lucky Time:</span> ${data.lucky_time}</p>`);
            });
        }
    });

    // Reset modal window after closing it
    $('#horoscopeModal').on('hidden.bs.modal', function(){
        $('#horoscopeModal .modal-title').html('');
        $('#horoscopeModal .modal-body').html('');
    });

    // Set date in footer
    $('#footerDate').text(new Date().toDateString());
});