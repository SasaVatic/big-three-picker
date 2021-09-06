$(document).ready( function () {
    $('#bigThreeTable').DataTable({
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
                data: null,
                className: 'dt-right',
                render: function(data, type, row){
                    const sun = row.Sun.slice(2);
                    const moon = row.Moon.slice(2);
                    const rising = row.Rising.slice(2);
                    return `<a href='/details?sun=${sun}&moon=${moon}&rising=${rising}' class='btn btn-outline-secondary w-100'>About</a>`;
                }
            }
        ],
        ordering: false,
        responsive: true,
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
        "dom": '<"top"l>rt<"bottom"ip><"clear">'
    });
    $('#bigThreeTable_length').addClass('px-2');
    $('#bigThreeTable_info').addClass('px-2 py-0');
    $('#bigThreeTable_paginate').addClass('d-flex justify-content-center mb-2');

    // back to previous page
    $('.back-btn').on('click', () => {
        window.history.back();
    });

    $('#horoscopeSelect').on('change', async (e) => {
        $('#horoscopeModal').modal('show');
        const urlParam = e.target.value.toLowerCase();
        $.get(`/horoscope/${urlParam}`, function(data) {
            $('#horoscopeModal .modal-title').text(e.target.value);
            $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Current Date:</span> ${data.current_date}</p>`);
            $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Description:</span> ${data.description}</p>`);
            $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Compatibility:</span> ${data.compatibility}</p>`);
            $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Mood:</span> ${data.mood}</p>`);
            $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Color:</span> ${data.color}</p>`);
            $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Lucky Number:</span> ${data.lucky_number}</p>`);
            $('#horoscopeModal .modal-body').append(`<p class='text-light'><span class='text-white'>Lucky Time:</span> ${data.lucky_time}</p>`);
        });
    });

    $('#horoscopeModal').on('hidden.bs.modal', function(){
        $('#horoscopeModal .modal-body').html('');
    });

    $('#footerDate').text(new Date().toDateString());
});