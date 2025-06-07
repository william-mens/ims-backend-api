import { S3Client, PutObjectCommand,ObjectCannedACL } from '@aws-sdk/client-s3';


const s3Client = new S3Client({ region: 'eu-west-1' });


export const imageUpload = async (base64: any, productId: string, fileStoragePath = 'products') => {
    console.log('loging base64 string', [base64]);
    console.log('data request for fileupload', [productId]);
    const base64Data =  Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const type = base64.split(';')[0].split('/')[1];
    const imageBucket = process.env.S3_BUCKET_NAME as string;
    const params = {
        Bucket: imageBucket,
        Key: `${fileStoragePath}/${productId}.jpg`, // type is not required
        Body: base64Data,
        ACL: ObjectCannedACL.public_read,
        ContentEncoding: "base64",
        ContentType: `image/${type}`, 
    };
    let location = '';
    try {
        await s3Client.send(new PutObjectCommand(params));
        location = `https://${params.Bucket}.s3.eu-west-1.amazonaws.com/${params.Key}`;
        console.log(location);
        return location;
    } catch (error) {
        console.log('failed to upload image to s3', error);
        return false;
    }
};