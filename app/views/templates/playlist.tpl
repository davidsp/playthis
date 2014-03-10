	<h3><strong><%=data.totalItems %></strong> results after searching for <strong><%=url%></strong></h3>
	<h5>Showing items from <%=data.startIndex%> to <%=data.startIndex * data.itemsPerPage %>  </h5>
    <section class="row list-items">
    <% 
    var results = data.items;
    for( var i in results) { %>
	    <div class="col-md-3">
	        <p><a href="#video/<%=results[i].id%>" class="video-link" data-id="results[i].id"><img src="<%= results[i].thumbnail.hqDefault %>"></a></p>
	        <p><a href="#video/<%=results[i].id%>" class="video-link" data-id="results[i].id"><%= results[i].title %></a></p>
	    </div>
    <% } %>

    </section>
