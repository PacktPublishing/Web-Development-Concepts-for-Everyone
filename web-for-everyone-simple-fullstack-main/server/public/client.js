let tasks = [];

$(() => {
  $('.container').on('click', '.btn-complete', completeTask);
  $('.container').on('click', '.btn-delete', deleteTask);
  $('#form-newtask').on('submit', addTask);
  getTasks();
});

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/api/tasks',
  }).then((response) => {
    render(response);
  });
}

function addTask(event) {
  event.preventDefault();
  const data = {
    task: $('#input-newtask').val(),
  };
  $.ajax({
    type: 'POST',
    url: '/api/tasks',
    data: data,
  }).then((response) => {
    getTasks();
    $('#input-newtask').val('');
  });
}

function completeTask() {
  const id = findId($(this));
  $.ajax({
    type: 'PUT',
    url: `/api/tasks/${id}`,
  }).then((response) => {
    getTasks();
  });
}

function deleteTask() {
  const id = findId($(this));
  console.log('delete');
  $.ajax({
    type: 'DELETE',
    url: `/api/tasks/${id}`,
  }).then((response) => {
    getTasks();
  });
}

function findId(el) {
  return el.closest('.task').data('id');
}

function render(tasks) {
  $('.container').empty();

  for (let task of tasks) {
    console.log(task);
    const completedEl = !task.completed
      ? `<button class="btn-complete">Complete</button>`
      : ``;

    $('.container').append(`
        <div class="task" data-id=${task.id}>
            <span>
                ${task.task_name}
                <button class="btn-delete">X</button>
                ${completedEl}
            </span>
            <hr/>
        <div>
    `);

    if (task.completed) {
      const el = $('.container').children().last();
      el.addClass('completed');
    }
  }
}
