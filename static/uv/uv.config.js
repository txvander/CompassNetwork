self.__uv$config = {
    prefix: '/static/uv/service/',  // This can remain the same if your proxy service uses this prefix

    // Change 'bare' to a local static path for the resources
    bare: './static/uv/',  // Local relative path (assuming the files are in a 'static/uv' folder)

    // URL encoding and decoding functions (unchanged)
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,

    
    handler: './static/uv/uv.handler.js',  // Adjust paths to be relative to the HTML file
    bundle: './static/uv/uv.bundle.js',
    config: './static/uv/uv.config.js',
    sw: './static/uv/uv.sw.js',
};
