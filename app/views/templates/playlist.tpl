	<h3><strong><%=totalItems %></strong> results after searching for <strong><%=url%></strong></h3>
    <nav class="pagination-wrap"></nav>
    <section class="row list-items">
    <% 
    var results = items;
    for( var i in results) { %>
	    <div class="col-xs-12 col-sm-6 col-md-3">
	        <p><a href="#video/<%=results[i].id.videoId%>" class="video-link" data-id="results[i].id.videoId"><img src="<%= results[i].snippet.thumbnails.high.url %>"></a></p>
	        <p><a href="#video/<%=results[i].id.videoId%>" class="video-link" data-id="results[i].id.videoId"><%= results[i].snippet.title %></a></p>
	    </div>
    <% } %>
    </section>
    <nav class="pagination-wrap"></nav>    
