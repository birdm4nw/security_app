package com.security.app.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import com.mongodb.client.gridfs.model.GridFSFile;
import java.io.InputStream;
import java.io.IOException;
import org.apache.commons.io.IOUtils;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class CaptionController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private GridFsOperations gridFsOperations;

    @GetMapping("/captions")
    public ResponseEntity<String> getAllCaptions() {
        Query query = new Query();
        List<String> captions = mongoTemplate.find(query, String.class, "captions");
        if (!captions.isEmpty()) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String json = objectMapper.writeValueAsString(captions);
                return new ResponseEntity<>(json, HttpStatus.OK);
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/captions/{imageId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String imageId) {
        GridFSFile gridFSFile = mongoTemplate.findOne(new Query(Criteria.where("_id").is(imageId)), GridFSFile.class);
        if (gridFSFile != null) {
            try {
                GridFsResource resource = gridFsOperations.getResource(gridFSFile);
                InputStream inputStream = resource.getInputStream();
                byte[] bytes = IOUtils.toByteArray(inputStream);
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG);
                return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
