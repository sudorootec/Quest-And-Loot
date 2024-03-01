// Scripts related to the displaying of data on screen and manipulation of html elements
// -------------------------------------------------------------------------------------

// Opens a prompt for the player to rename their guild
function openPromptRenameGuild(){
    Swal.fire({
        title: 'What is the name of your guild?',
        input: 'text',
        inputPlaceholder: guild.name,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Done'
    }).then((result) => {
        if (result.isConfirmed) {
            const new_name = result.value;
            alterGuildName(new_name);
        }
    });
}

// Alters guild name on the guild object and updates every element that displays it
function alterGuildName(new_name){
    if(new_name == '' || new_name === null){
        return;
    }

    if(new_name.length > 40){
        alert("Max character number exceeded (40)");
        return;
    }

    guild.name = new_name;
    $('#header_guild_name').html(guild.name);
    $('#guild_details_modal_guild_name').val(guild.name);
}

// Alters guild level on the guild object and updates every element that displays it
function alterGuildLevel(new_level){
    guild.level = new_level;
    $('#header_guild_level').html('Level: ' + guild.level);
    $('#guild_details_modal_guild_level').val(guild.level);
}

// Prepares elements within adventurers modal when it is opened
function updateAdventurersModal(){
    $('#modal_adventurers_total_amount').html(adventurers_recruited.length + '/' + getMaxAdventurers());

    if ($.fn.DataTable.isDataTable('#modal_adventurers_table' )) {
        modal_adventurers_table.clear();
        modal_adventurers_table.rows.add(adventurers_recruited).draw();
    } else {
        modal_adventurers_table = $('#modal_adventurers_table').DataTable({
            columns: [
                {
                    data: 'name',
                    title: 'Name',
                    className: 'text-center'
                },
                {
                    data: 'level',
                    title: 'Level',
                    className: 'text-center'
                },
                {
                    data: 'id_state',
                    title: 'State',
                    className: 'text-center',
                    render: function(data, type, row){
                        return adventurer_states[data];
                    }
                },
                {
                    title: 'Options',
                    className: 'text-center',
                    orderable: false,
                    render: function(data, type, row){
                        buttons = [];

                        buttons.push({
                            class: 'btn btn-sm btn-primary',
                            description: 'Details',
                            icon: 'bi bi-eye-fill',
                            onclick: `index = modal_adventurers_table.row($(this).closest('tr')).index(); openAdventurerDetailsModal(index);`
                        });

                        if(row.id_state == 1){
                            buttons.push({
                                class: 'btn btn-sm btn-danger',
                                description: 'Dismiss',
                                icon: 'bi bi-x-lg',
                                onclick: `confirmDismissAdventurer(this)`
                            });
                        }

                        return generateButtons(buttons);
                    }
                }
            ],
            data: adventurers_recruited,
            language: {
                emptyTable: 'No adventurers in your guild right now.'
            },
            paging: false,
            searching: false,
            info:     false,
            order: [
                [0, "asc"]
            ],
            destroy: true
        });
    }
}

// Prepares elements within recruitment modal when it is opened
function updateRecruitmentModal(){
    if ($.fn.DataTable.isDataTable('#modal_recruitment_table' )) {
        modal_recruitment_table.clear();
        modal_recruitment_table.rows.add(adventurers_aspiring).draw();
    } else {
        modal_recruitment_table = $('#modal_recruitment_table').DataTable({
            columns: [
                {
                    data: 'name',
                    title: 'Name',
                    className: 'text-center'
                },
                {
                    data: 'level',
                    title: 'Level',
                    className: 'text-center'
                },
                {
                    data: 'id_state',
                    title: 'State',
                    className: 'text-center',
                    render: function(data, type, row){
                        return adventurer_states[data];
                    }
                },
                {
                    title: 'Options',
                    className: 'text-center',
                    orderable: false,
                    render: function(data, type, row){
                        let buttons = [];

                        buttons.push({
                            class: 'btn btn-sm btn-success',
                            description: 'Recruit',
                            icon: 'bi bi-check-lg',
                            onclick: `recruitAdventurer(this)`
                        });

                        return generateButtons(buttons);
                    }
                }
            ],
            data: adventurers_aspiring,
            language: {
                emptyTable: 'No adventurers awaiting recruitment right now.'
            },
            paging: false,
            searching: false,
            info:     false,
            order: [
                [0, "asc"]
            ],
            destroy: true
        });
    }
}

// Opens the adventurer details modal
function openAdventurerDetailsModal(adventurer_index){
    console.log(adventurers_recruited[adventurer_index]);
}

// Returns one or more HTML button elements based on the provided parameters (class, text, description, icon, onclick)
function generateButtons(buttons_params){
    let buttons_to_generate = [];

    $.each(buttons_params, function(key, button_params){
        let button_to_generate = '<button class="'+button_params.class+'"';

        if(button_params.onclick){
            button_to_generate += ' onclick="'+button_params.onclick+'"';
        }

        if(button_params.description){
            button_to_generate += ' title="'+button_params.description+'"';
        }

        button_to_generate += '>';

        if(button_params.icon){
            button_to_generate += '<i class="'+button_params.icon+'"></i>';
        }

        if(buttons_params.text){
            button_to_generate += button_params.text;
        }

        button_to_generate += '</button>';

        buttons_to_generate.push(button_to_generate);
    });

    return buttons_to_generate.join(' ');
}