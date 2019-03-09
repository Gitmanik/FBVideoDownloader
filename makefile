ZIP_FILENAME = FBVideoDownloader.zip

default: all

all: ${ZIP_FILENAME}

clean:
	rm ${ZIP_FILENAME}

${ZIP_FILENAME}:
	zip ${ZIP_FILENAME} -9 **/**