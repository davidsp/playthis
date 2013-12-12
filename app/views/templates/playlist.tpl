<p>results after searching for <strong><%=url%></strong></p>


    <% for( var i in searchResults) { %>
        <p><a href="#video/<%=searchResults[i].id%>" class="video-link" data-id="searchResults[i].id"><img src="<%= searchResults[i].thumbnail.sqDefault %>"></a></p>
        <p><a href="#video/<%=searchResults[i].id%>" class="video-link" data-id="searchResults[i].id"><%= searchResults[i].title %></a></p>
    <% } %>
