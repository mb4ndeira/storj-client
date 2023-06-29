package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"

	"storj.io/uplink"
)

type Actions struct {
	PipeData string
}

func upload(ctx context.Context, bucketName, objectKey string, accessGrant string, dataReader io.Reader) error {
	access, err := uplink.ParseAccess(accessGrant)
	if err != nil {
		return fmt.Errorf("could not parse access grant: %w", err)
	}

	project, err := uplink.OpenProject(ctx, access)
	if err != nil {
		return fmt.Errorf("could not open project: %w", err)
	}
	defer project.Close()

	_, err = project.EnsureBucket(ctx, bucketName)
	if err != nil {
		return fmt.Errorf("could not ensure bucket: %w", err)
	}

	upload, err := project.UploadObject(ctx, bucketName, objectKey, nil)
	if err != nil {
		return fmt.Errorf("could not initiate upload: %w", err)
	}

	_, err = io.Copy(upload, dataReader)
	if err != nil {
		_ = upload.Abort()
		return fmt.Errorf("could not upload data: %w", err)
	}

	err = upload.Commit()
	if err != nil {
		return fmt.Errorf("could not commit uploaded object: %w", err)
	}

	return nil
}

func requestArgs() {
	log.Fatalln("Error: arguments missing")
}

func main() {
	arguments := os.Args[1:]

	if len(arguments) == 0 {
		requestArgs()
	}

	switch arguments[0] {
	case "upload":
		dataReader := io.Reader(os.Stdin)

		err := upload(context.Background(), arguments[1], arguments[2], arguments[3], dataReader)
		if err != nil {
			log.Fatalln("Error:", err)
		}

	default:
		requestArgs()
	}
}
