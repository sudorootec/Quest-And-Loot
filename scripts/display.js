// Scripts related to the displaying of data on screen and manipulation of html elements
// -------------------------------------------------------------------------------------

// Opens a prompt for the player to rename their guild
function openPromptRenameGuild(){
    let new_name = prompt("What is the name of your guild?",(guild.name || "Adventurer's Guild"));

    if(new_name == '' || new_name === null){
        return;
    }

    if(new_name.length > 40){
        alert("Max character number exceeded (40)");
        return;
    }

    alterGuildName(new_name);
}

// Alters guild name on the guild object and updates every element that displays it
function alterGuildName(new_name){
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
                        // todo: Buttons for this table
                        return '';
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
                        let button = [];

                        button.push({
                            class: 'btn btn-sm btn-success',
                            text: 'Recruit',
                            icon: 'bi bi-check',
                            onclick: `recruitAdventurer(this)`
                        });

                        return generateButtons(button);
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

// Returns one or more HTML button elements based on the provided parameters (class, text, icon, onclick)
function generateButtons(buttons_params){
    let buttons_to_generate = [];

    $.each(buttons_params, function(key, button_params){
        let button_to_generate = '<button class="'+button_params.class+'"';

        if(button_params.onclick){
            button_to_generate += ' onclick="'+button_params.onclick+'"';
        }

        button_to_generate += '>';

        if(button_params.icon){
            button_to_generate += '<i class="'+button_params.icon+'"></i>';
        }

        button_to_generate += button_params.text+'</button>';

        buttons_to_generate.push(button_to_generate);
    });

    return buttons_to_generate.join(' ');
}