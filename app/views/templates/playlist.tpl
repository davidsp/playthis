	<h3>results after searching for <strong><%=url%></strong></h3>
    <section class="row list-items">
    <% for( var i in searchResults) { %>
	    <div class="large-2 medium-4 small-12 columns">
	        <p><a href="#video/<%=searchResults[i].id%>" class="video-link" data-id="searchResults[i].id"><img src="<%= searchResults[i].thumbnail.sqDefault %>"></a></p>
	        <p><a href="#video/<%=searchResults[i].id%>" class="video-link" data-id="searchResults[i].id"><%= searchResults[i].title %></a></p>
	    </div>
    <% } %>
    </section>
