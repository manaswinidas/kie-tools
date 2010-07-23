package org.jboss.errai.bus.tests;

import junit.framework.TestCase;
import org.jboss.errai.bus.client.api.Message;
import org.jboss.errai.bus.client.api.base.JSONMessage;
import org.jboss.errai.bus.client.api.base.MessageBuilder;
import org.jboss.errai.bus.server.io.JSONDecoder;
import org.jboss.errai.bus.server.io.JSONEncoder;
import org.jboss.errai.bus.server.io.JSONStreamDecoder;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

/**
 * User: christopherbrock
 * Date: 17-Jul-2010
 * Time: 7:42:27 PM
 */
public class JSONTests extends TestCase {
    public void testEncode() {
        MessageBuilder.setMessageProvider(JSONMessage.PROVIDER);

        Map<String, Object> inputParts = new HashMap<String, Object>();
        inputParts.put("ToSubject", "Foo");
        inputParts.put("Message", "\"Hello, World\"");
        inputParts.put("Sentence", "He said he was \"okay\"!");
        inputParts.put("TestUnterminatedThings", "\" { [ ( ");
        inputParts.put("Num", 123);

        Message msg = MessageBuilder.createMessage().getMessage();

        for (Map.Entry<String, Object> entry : inputParts.entrySet()) {
            msg.set(entry.getKey(), entry.getValue());
        }

        String encodedJSON = JSONEncoder.encode(msg.getParts());
        Map<String, Object> decoded = (Map<String, Object>) JSONDecoder.decode(encodedJSON);
        assertEquals(inputParts, decoded);
    }

    public void testStreamDecoder() {
        MessageBuilder.setMessageProvider(JSONMessage.PROVIDER);

        Map<String, Object> inputParts = new HashMap<String, Object>();
        inputParts.put("ToSubject", "Foo");
        inputParts.put("Message", "\"Hello, World\"");
        inputParts.put("Sentence", "He said he was \"okay\"!");
        inputParts.put("TestUnterminatedThings", "\" { [ ( ");
        inputParts.put("Num", 123l);

        Message msg = MessageBuilder.createMessage().getMessage();

        for (Map.Entry<String, Object> entry : inputParts.entrySet()) {
            msg.set(entry.getKey(), entry.getValue());
        }

        try {
            String encodedJSON = JSONEncoder.encode(msg.getParts());
            System.out.println(">" + encodedJSON);

            ByteArrayInputStream instream = new ByteArrayInputStream(encodedJSON.getBytes());

            Map<String, Object> decoded = (Map<String, Object>) JSONStreamDecoder.decode(instream);
            assertEquals(inputParts, decoded);

        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }

//    public void testStreamDecoder2() {
//        String json = "{\"ReplyTo\":\"ClientEndpoint\",\"ToSubject\":\"ObjectService\"}:>[{Records:[{__EncodedType:\"org.errai.samples.serialization.client.model.Record\",recordId:1,name:\"Mike\",balance:-40.23,accountOpened:1086223206050,type:{__EncodedType:\"org.errai.samples.serialization.client.model.RecordType\", EnumStringValue:\"Savings\"},stuff:[{__EncodedType:\"org.errai.samples.serialization.client.model.Item\",itemName:\"MacBookPro15\",quantity:2},{__EncodedType:\"org.errai.samples.serialization.client.model.Item\",itemName:\"iPhone3G\",quantity:2}],properties:{\"Place\":\"Toronto\",\"FavoriteColor\":\"Blue\"}},{__EncodedType:\"org.errai.samples.serialization.client.model.Record\",recordId:2,name:\"Lillian\",balance:30.1,accountOpened:1108086006050,type:{__EncodedType:\"org.errai.samples.serialization.client.model.RecordType\", EnumStringValue:\"Savings\"},stuff:[{__EncodedType:\"org.errai.samples.serialization.client.model.Item\",itemName:\"MacBookPro15\",quantity:1},{__EncodedType:\"org.errai.samples.serialization.client.model.Item\",itemName:\"iPhone3G\",quantity:1}],properties:{\"Place\":\"Toronto\",\"FavoriteColor\":\"Green\"}},{__EncodedType:\"org.errai.samples.serialization.client.model.Record\",recordId:3,name:\"Heiko\",balance:50.5,accountOpened:1150850406050,type:{__EncodedType:\"org.errai.samples.serialization.client.model.RecordType\", EnumStringValue:\"Checking\"},stuff:[{__EncodedType:\"org.errai.samples.serialization.client.model.Item\",itemName:\"iPhone3Gs\",quantity:1},{__EncodedType:\"org.errai.samples.serialization.client.model.Item\",itemName:\"MacBookPro13\",quantity:2}],properties:{\"Place\":\"Germany\",\"FavoriteColor\":\"Orange\"}}],ToSubject:\"ClientEndpoint\"}]";
//        try {
//            System.out.println(json);
//            ByteArrayInputStream instream = new ByteArrayInputStream(json.getBytes());
//            Map<String, Object> decoded = (Map<String, Object>) JSONStreamDecoder.decode(instream);
//
//        }
//        catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

    public static class SimpleWriter extends Writer {
        final StringBuilder builder = new StringBuilder();

        @Override
        public void write(char[] cbuf, int off, int len) throws IOException {
            builder.append(cbuf, off, len);
        }

        @Override
        public void flush() throws IOException {
        }

        @Override
        public void close() throws IOException {
            //To change body of implemented methods use File | Settings | File Templates
        }
    }

    public static class SimpleReader extends Reader {
        final StringBuilder builder;
        int cursor = 0;

        public SimpleReader(StringBuilder builder) {
            this.builder = builder;
        }

        @Override
        public int read(char[] cbuf, int off, int len) throws IOException {
            int read = len > builder.length() ? builder.length() : len;
            builder.getChars(cursor, read, cbuf, off);
            cursor += read;
            return read;
        }

        @Override
        public void close() throws IOException {
            //To change body of implemented methods use File | Settings | File Templates.
        }
    }


}
