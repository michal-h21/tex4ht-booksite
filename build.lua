local domfilter = require("make4ht-domfilter")
local domprocess = domfilter("collapsetoc")
Make:match("html$", domprocess, {toc_query="nav.TOC"})
