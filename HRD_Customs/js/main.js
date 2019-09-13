//delete foreign
$(document).ready(function(){
  $('.delete-foreign_detail').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url:'/foreign_details/'+id,
      success: function(response){
        alert('Deleting the required detail');
        window.location.href='/foreign_details/show';
      }
    });
  });
});

// delete local
$(document).ready(function(){
  $('.delete-local_detail').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url:'/local_details/'+id,
      success: function(response){
        alert('Deleting the required detail');
        window.location.href='/local_details/show';
      }
    });
  });
});
